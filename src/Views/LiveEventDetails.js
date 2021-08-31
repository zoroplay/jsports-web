import React, {useEffect, useState} from "react";
import '../Assets/scss/_live-details.scss';
import {getLiveFixtureData} from "../Services/apis";
import {useDispatch, useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {matchStatus} from "../Utils/constants";
import {formatOdd, isSelected, sortTeams} from "../Utils/helpers";
import {addToCoupon} from "../Redux/actions";
import {createID} from "../Utils/couponHelpers";

export function LiveEventDetails ({location, history}) {
    const urlParam = new URLSearchParams(location.search);
    const eventId = urlParam.get('EventID');
    const [sport, setSport] = useState(null);
    const [fixture, setFixture] = useState(null);
    const [markets, setMarkets] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const coupon = useSelector(({couponData}) => couponData.coupon);

    const fetchFixture = () => {
        getLiveFixtureData(eventId).then(res => {
            setLoading(false);
            if (res.Id === 0)
                history.push('/Live/LiveDefault');

            setSport(res);
            setFixture(res.Tournaments[0].Events[0]);
        }).catch(err => {
            setLoading(false)
            // console.log(err);
        })
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchFixture();
    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            fetchFixture();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(markets){
            let newMarkets = fixture.Markets;

            newMarkets.forEach((item, key) => {
                // if(item.Status !== 0){
                    item.Selections.forEach((selection, s) => {
                        if (markets[key]) {
                            let oldOdd = (markets[key].Selections[s]) ? parseFloat(markets[key].Selections[s].Odds[0].Value) : 0;
                            let oldOddChange = (markets[key].Selections[s]) ? markets[key].Selections[s].OddChanged : '';
                            let newOdd = parseFloat(selection.Odds[0].Value);

                            if (newOdd > oldOdd) {
                                selection.OddChanged = 'Increased';
                                selection.Animate = true;
                            } else if (newOdd < oldOdd) {
                                selection.OddChanged = 'Decreased'
                                selection.Animate = true;
                            } else if (newOdd === 0) {
                                selection.OddChanged = '';
                            } else {
                                selection.OddChanged = oldOddChange;
                            }

                            // if (coupon.selections.length) {
                            //     checkOddsChange(coupon, fixture, selection, dispatch, SportsbookGlobalVariable, SportsbookBonusList);
                            // }
                        }
                    });
                // }
                // console.log(item);
            });

            setMarkets(newMarkets);
        } else {
            setMarkets(fixture?.Markets);
        }
    }, [fixture]);


    const selectOdds = (market, selection) => {
        fixture.TournamentName = sport.Tournaments[0]?.Name;
        fixture.SportName = sport.Name;
        dispatch(addToCoupon(fixture, market.Id, market.Name, selection.Odds[0].Value, selection.Id, selection.Name,
                createID(fixture.ProviderId, market.Id, selection.Name, selection.Id),'live'))
    }

    return (
        <div id="eventContainer">
            <div className="headerItem">
                <div className="arrow-icon" onClick={() => history.push('/Live/LiveDefault')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                {sport && <div className="breadcrumb">
                    {sport?.Name} / {sport?.Tournaments[0]?.Events[0]?.CategoryName} / {sport.Tournaments[0]?.Name}
                </div> }
                {fixture && <div className="event-details">
                    <div className="time-status">
                        {fixture?.MatchTime !== 0 && <span className="time">{fixture.MatchTime}<span className="timeFlash">'</span></span>}
                        &nbsp;<span className="status">{matchStatus(fixture?.MatchStatus)}</span>
                    </div>
                    <div className="event-name-score">
                        <span className="event-name home">{sortTeams(fixture?.Teams)[0]?.Name}</span>
                        <span className="score">
                            <span className="home">{fixture?.HomeGameScore}</span>
                            <span> - </span>
                            <span className="away">{fixture?.AwayGameScore}</span>
                        </span>
                        <span className="event-name away">{sortTeams(fixture?.Teams)[1]?.Name}</span>
                    </div>
                </div>}
            </div>
            <ol id="live-bets-grid" style={{letterSpacing: '-4px'}}>
                {markets?.map(market =>
                <li className="Bet"
                    style={{paddingLeft: '0px', paddingRight: '0px', marginLeft: '0px', marginRight: '0px', width: '100%', letterSpacing: 'normal'}}
                    key={market.Id}
                >
                    <div className="BetContainer">
                        <div className="Header Relative">
                            <div className="Content">
                                <h4 data-bind="text: Caption">{market.Name}</h4>
                                <div className="ToggleButton" title="Collapse All Bets" />
                                <div className="ToggleButton Toggled" title="Expand All Bet" style={{display: 'none'}} />
                                <div className="FavoriteButton" title="preferred" />
                            </div>
                        </div>
                        <ol style={{letterSpacing: '-4px'}}>
                            {market.Status !== 0 && market.Selections && market.Selections.map(selection =>
                                <li className={`Odds Relative ${market.Selections.length === 2 ? 'col-2' : 'col-3'}
                                    ${isSelected(createID(fixture.ProviderId, market.Id, selection.Name, selection.Id), coupon) ? 'sel' : ''}
                                `}
                                    key={selection.Id}
                                >
                                <div
                                    className={`Content ${selection.Odds[0].Status === 0 ? 'Lock' : ''}`}
                                    onClick={() => selectOdds(market, selection)}
                                >
                                    <div className="Playability Ellipsed">
                                        <h5 title="1 (single)" className="Single">{selection.Name}</h5>
                                    </div>
                                    <div className="Trend Ellipsed">
                                        <h6 title="37.00" className={`${selection.OddChanged} ${selection.Animate ? 'Animate' : ''}`}>{formatOdd(selection.Odds[0].Value)}</h6>
                                    </div>
                                </div>
                            </li>)}

                        </ol>
                    </div>
                </li>)}
                <li id="live-bets-empty" style={{display: 'none' }}>NoBets</li>
            </ol>
        </div>
    )
}