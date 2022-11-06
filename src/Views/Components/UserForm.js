// import {formatNumber} from "../../Utils/helpers";
import React from "react";
import {Field} from "formik";
// import DatePicker from "react-datepicker";


export const UserForm = ({
                             errors,
                      touched,
                      setFieldValue,
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      values,
    history
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <table width="100%" cellSpacing="0" className="tblDatiUser">
                <tbody>
                <tr>
                    <td className="cellaSx">Name</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            name="first_name"
                            type="text" value={values.first_name}
                            maxLength="50"
                            id="s_w_PC_PC_txtNome"
                            className="textbox" />
                        {errors.first_name && touched.first_name &&
                        <div id="" style={{color:'Red'}}>
                            <span className="imgError"/> {errors.first_name}
                        </div>}
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx">Surname</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            name="last_name"
                            type="text" value={values.last_name}
                            maxLength="50"
                            id="s_w_PC_PC_txtCognome"
                            className="textbox" />
                        {errors.last_name && touched.last_name &&
                        <div id="" style={{color:'Red'}}>
                            <span className="imgError"/> {errors.last_name}
                        </div>}
                    </td>
                </tr>
                {/*<tr>
                    <td className="cellaSx">Date of birth</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className="textbox"
                            style={{width:'75px' }}
                            onChange={date => setFieldValue('date_of_birth', date)}
                            autocomplete="off"
                            selected={values.date_of_birth}
                        />
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx">Gender</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            as="select"
                            name="gender"
                            id="s_w_PC_PC_ddlSx"
                            className="dropdown"
                            onChange={(e) => setFieldValue('gender', e.target.value)}
                            style={{width: '40px'}}>
                            <option selected="selected" value="Male">M</option>
                            <option value="Female">F</option>
                        </Field>
                    </td>
                </tr>

                <tr id="s_w_PC_PC_trLinguaMessaggi">
                    <td className="cellaSx">Message Lang.</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            as="select"
                            name="language"
                            id="s_w_PC_PC_ddlLinguaMessaggi"
                            className="dropdown">
                            <option selected="selected" value="EN">English</option>
                        </Field>
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx" width="100%">Country</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            as="select"
                            name="country"
                            id="s_w_PC_PC_ddlPaese"
                            className="dropdown">
                            <option value="160">Uganda</option>
                        </Field>
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx">State</td>
                    <td className="cellaSx"/>
                    <td className="cellaDx">
                        <Field
                            as="select"
                            name="state"
                            id="s_w_PC_PC_ddlPaese"
                            className="dropdown">
                            <option value="">Select state</option>
                        </Field>
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx">Address</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            name="address"
                            type="text" value={values.address}
                            maxLength="50"
                            id="s_w_PC_PC_txtIndirizzo"

                            className="textbox"
                        />
                    </td>
                </tr>*/}
                <tr id="rowEmailAddress">
                    <td className="cellaSx" width="100%">Email</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            name="email" type="text"
                            value={values.email} maxLength="50"
                            id="s_w_PC_PC_Email"
                            className="textbox" />
                        {errors.email && touched.email &&
                        <div id="" style={{color:'Red'}}>
                            <span className="imgError"/> {errors.email}
                        </div>}
                    </td>
                </tr>
                {/*<tr>
                    <td className="cellaSx">Tel.:</td>
                    <td className="cellaSx">
                        <div id="s_w_PC_PC_lbTelObbligatorio"><b>*</b></div>
                    </td>
                    <td className="cellaDx">
                        <Field
                            name="phone_number"
                            type="text" maxLength="50"
                            id="s_w_PC_PC_txtTelefono"

                            value={values.phone_number}
                            className="textbox" />
                        {errors.phone_number && touched.phone_number &&
                        <div id="" style={{color:'Red'}}>
                            <span className="imgError"/> {errors.phone_number}
                        </div>}
                    </td>
                </tr>*/}
                <tr>
                    <td className="cellaSx">Username/Phone No.</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            name="username"
                            type="text" value={values.username}
                            maxLength="20"
                            id="s_w_PC_PC_Username"

                            className="textbox"
                        />
                        {errors.username && touched.username &&
                        <div id="" style={{color:'Red'}}>
                            <span className="imgError"/> {errors.username}
                        </div>}
                    </td>
                </tr>
                <tr>
                    <td className="cellaSx">Password</td>
                    <td className="cellaSx"><b>*</b></td>
                    <td className="cellaDx">
                        <Field
                            name="password"
                            type="password"
                            value={values.password}
                            maxLength="50"
                            id="s_w_PC_PC_txtCitta"

                            className="textbox" />
                        {errors.password && touched.password &&
                        <div id="" style={{color:'Red'}}>
                            <span className="imgError"/> {errors.password}
                        </div>}
                    </td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <div className="spacer5"/>
                    </td>
                </tr>
                <tr>
                    <td align="right" colSpan="3">
                        <input
                            type="submit" name="s$w$PC$PC$btnReset"
                            value="Cancel"
                            onClick={() => history.goBack()}
                            id="s_w_PC_PC_btnReset" className="button" />
                        <button
                            {...(!isValid && { disabled: true })}
                            {...(isSubmitting && { disabled: true })}
                            type="submit"
                            name="s$w$PC$PC$btnCreateUser"
                            id="s_w_PC_PC_btnCreateUser"
                            className="button"
                        >{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td colSpan="4">
                        <div className="spacer5"></div>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}
