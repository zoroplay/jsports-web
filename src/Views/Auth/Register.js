import React, { useEffect } from "react";
import Others from "../layout/Others";
import * as Yup from "yup";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { login, register } from "../../Services/apis";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_DATA } from "../../Redux/types";
import useSWR from "swr/esm/use-swr";

const error = {
  border: "1px solid red",
  backgroundColor: "pink",
};

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(11, "Please enter a valid phone number")
    .required("Your phone number is required"),
  password: Yup.string()
    .min(3, "Minimum 3 letters")
    .required("Enter a password"),
  term: Yup.boolean().required("You have not accepted"),
  age: Yup.boolean().required("Confirm you are 18 or older"),
  confirm_password: Yup.string()
    .min(3, "Minimum 4 letters")
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function Register({ history }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [bg, setBg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { data: res, error: errorData } = useSWR(
    "/utilities/bg-image?type=registration&position=background"
  );

  useEffect(() => {
    if (res && res.image_path) {
      setBg(res.image_path);
    }
  }, [res]);

  useEffect(() => {
    if (isAuthenticated) history.push("/Sport/Default");
  }, [isAuthenticated]);

  return (
    <Others>
      <div className="aqx-main">
        <div className="aqx-main-inner">
          {/* <div className="aqx-a">
            <div className="aqx-banner">
              <a href="#" className="aqx-banner-link">
                <div
                  className="aqx-banner-img"
                  style={{
                    backgroundImage: bg
                      ? `url(${bg})`
                      : "http:/img/aqx-reg-banner.jpg",
                  }}
                />
              </a>
            </div>

            
          </div> */}

          <div className="aqx-b">
            <div className="aqx-b-head">
              <h3 className="aqx-b-head-txt">Registration</h3>
            </div>
            <Formik
              initialValues={{
                username: "",
                password: "",
                confirm_password: "",
                referral_code: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values, { setSubmitting }) => {
                const payload = {
                  username: values.username,
                  phone: values.username,
                  password: values.password,
                  confirm_password: values.confirm_password,
                  referral_code: values?.referral_code,
                };
                register(payload)
                  .then((res) => {
                    setSubmitting(false);
                    if (res.success) {
                      const { username, password } = res.credentials;
                      login(username, password)
                        .then((res) => {
                          dispatch({
                            type: SET_USER_DATA,
                            payload: {
                              user: res.user,
                              access_token: res.token,
                              isAuthenticated: true,
                            },
                          });
                          history.push("/Sport/Default");
                        })
                        .catch((err) => {
                          if (err.response.status === 401) {
                            toast.error(err.message);
                          }
                        });
                    }
                  })
                  .catch((err) => {
                    setSubmitting(false);
                    if (err.response.status === 422) {
                      let errors = Object.values(err.response.data.errors);
                      errors = errors.flat();
                      errors.forEach((error) => {
                        toast.error(error);
                      });
                    } else {
                      toast.error(err.message);
                    }
                  });
              }}
            >
              {({ isSubmitting, touched, errors, values }) => (
                <Form>
                  <div className="aqx-b-content">
                    <div className="aqx-b-content-inner">
                      <div className="aqx-loax-a">
                        <div className="dnxreg-box">
                          <div className="dnxreg-box-a">
                            <label htmlFor="" className="nxlabel">
                              Phone Number *
                            </label>
                          </div>
                          <div
                            className="dnxreg-box-b"
                            style={{
                              display: "flex",
                            }}
                          >
                            <select name="pre" id="" className="nxmob-select">
                              <option value="+256">+256</option>
                            </select>
                            <Field
                              style={errors.username ? error : null}
                              type="text"
                              className="nxfield"
                              name="username"
                            />
                          </div>
                        </div>
                        {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <div className="dnxreg-box">
                                                    <div className="dnxreg-box-a">
                                                        <label htmlFor="" className="nxlabel">First Name *</label>
                                                    </div>
                                                    <div className="dnxreg-box-b">
                                                        <Field
                                                            style={errors.first_name ? error : null}
                                                            type="text"
                                                            className="nxfield"
                                                            placeholder=""
                                                            name="first_name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="dnxreg-box">
                                                    <div className="dnxreg-box-a">
                                                        <label htmlFor="" className="nxlabel">Last Name *</label>
                                                    </div>
                                                    <div className="dnxreg-box-b">
                                                        <Field
                                                            style={errors.last_name ? error : null}
                                                            type="text"
                                                            className="nxfield"
                                                            placeholder=""
                                                            name="last_name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dnxreg-box">
                                                <div className="dnxreg-box-a">
                                                    <label htmlFor="" className="nxlabel">Email Address *</label>
                                                </div>
                                                <div className="dnxreg-box-b">
                                                    <Field
                                                        style={errors.email ? error : null}
                                                        type="email"
                                                        className="nxfield"
                                                        placeholder=""
                                                        name="email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="dnxreg-box">
                                                <div className="dnxreg-box-a">
                                                    <label htmlFor="" className="nxlabel">Mobile Number*</label>
                                                </div>
                                                <div className="dnxreg-box-b">
                                                    <div className="nxmob">
                                                        <select name="" id="" className="nxmob-select">
                                                            <option value="+256">+256</option>
                                                        </select>
                                                        <Field
                                                            style={errors.phone ? error : null}
                                                            type="text"
                                                            className="nxmob-num"
                                                            placeholder="08181234567"
                                                            name="phone"
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                      </div>

                      <div className="aqx-loax-c">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="dnxreg-box">
                            <div className="dnxreg-box-a">
                              <label htmlFor="" className="nxlabel">
                                Password*
                              </label>
                            </div>
                            <div className="dnxreg-box-b">
                              <Field
                                style={errors.password ? error : null}
                                type={showPassword ? "text" : "password"}
                                id="dnxreg-pass1"
                                className="nxfield nx-field-pass"
                                placeholder="Password"
                                name="password"
                              />
                              <span
                                onClick={() => setShowPassword(!showPassword)}
                                className={`showpass ${
                                  showPassword ? "" : "hidepass"
                                }`}
                                id="showpass1"
                              />
                            </div>
                          </div>

                          <div className="dnxreg-box">
                            <div className="dnxreg-box-a">
                              <label htmlFor="" className="nxlabel">
                                Confirm Password*
                              </label>
                            </div>
                            <div className="dnxreg-box-b">
                              <Field
                                style={errors.confirm_password ? error : null}
                                type="password"
                                id="dnxreg-pass2"
                                className="nxfield nx-field-pass"
                                placeholder="Confirm Password"
                                name="confirm_password"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="dnxreg-box">
                          <div className="dnxreg-box-a">
                            <label htmlFor="" className="nxlabel">
                              Referral Code
                            </label>
                          </div>
                          <div className="dnxreg-box-b">
                            <Field
                              type="text"
                              className="nxfield"
                              name="referral_code"
                            />
                          </div>
                        </div>
                        <div className="dnxreg-age">
                          <div className="check">
                            <Field
                              className="check-term"
                              id="check-term"
                              type="checkbox"
                              name="term"
                              style={{
                                color: "red",
                                background: "white",
                              }}
                            />
                            <span
                              className="checkmark"
                              style={{
                                color: "red",
                                background: "white",
                              }}
                            />
                          </div>
                          <label
                            htmlFor="check-term"
                            className="dnxreg-age-txt"
                          >
                            I accept the
                            <a href="#">Terms of use.</a>
                            {errors.term ? (
                              <span
                                className="aqx-loax-a-info"
                                style={{ color: "Red" }}
                              >
                                {errors.term}
                              </span>
                            ) : null}
                          </label>
                        </div>

                        <div className="dnxreg-age">
                          <div className="check">
                            <Field
                              className="check-age"
                              id="check-age"
                              type="checkbox"
                              name="age"
                              style={{
                                color: "red",
                                background: "white",
                              }}
                            />
                            <span className="checkmark" />
                          </div>
                          <label htmlFor="check-age" className="dnxreg-age-txt">
                            I am over 18 years old.
                            {errors.age ? (
                              <span
                                className="aqx-loax-a-info"
                                style={{
                                  color: "red",
                                  background: "white",
                                }}
                              >
                                {errors.age}
                              </span>
                            ) : null}
                          </label>
                        </div>

                        <div className="aqx-loax-c-box">
                          <button
                            className="aqx-loax-btn aqx-loax-btn-go"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Register{" "}
                            {isSubmitting ? (
                              <i className="fa fa-spin fa-spinner" />
                            ) : (
                              ""
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="aqx-sub">
              <p className="aqx-txt">
                ALREADY HAVE AN ACCOUNT?{" "}
                <a className="aqx-txt-link" href="#">
                  Sign in
                </a>{" "}
                here
              </p>
            </div>
          </div>
        </div>
      </div>
    </Others>
  );
}
