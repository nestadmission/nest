import React from 'react'
import { Link } from 'react-router-dom'
export default function Dashinst() {
    
    return (
        <div className="container"style={{textAlign: 'justify',color:'#1B3D6C', margin: 20}}  >
            Please read carefully following instructions before apply for the admission application.
<br/>Admission procedure for new batch of PDIS-50 seats & PDIETM-25 seats is to be done ONLINE.
<br/><b>Birth place:</b> 
Applicant should write the birth place and if it is outside Gujarat then applicant should submit Domicile certificate- a proof of stay in Gujarat for more than last ten years to be issued by local Mamlatdar office.
<br/><b>Caste Category:</b>
Applicant should (√) tick appropriate caste, if selected caste is SC and ST, then only caste certificate is to be submitted. But if selected caste is SEBC, then in addition to the caste certificate Creamy layer certificate having validity of current financial year should submit. In case of EWS, EWS certificate is to be submitted. 
<br/><b>Qualification:</b>
Applicant shall (√) tick the maximum qualification acquire. In case of Diploma and BSc. Working experience of two years excluding of training and apprentice period after passing the Diploma or BSc.
<br/><b>NOC:</b>
Applicant should submit the NOC from the present employer in original copy. This NOC should clearly mention the name of candidate, course name PDIS/ PDIETM- separate for both and institution name- Narmada Education & Scientific Research Society, GNFC-Bharuch.
<br/><b>Experience certificate:</b>
In case of experienced applicant, applicant should submit the experience certificate from first organization to the current organization with the designation.
<br/>After filling the form, documents should be submitted self-attested except NOC in original to the address of NEST office in closed envelope should mention the name of candidate on overleaf.
<br/>

<Link to={'/dash'} ><button>Agree</button></Link> 
         
        </div>
    )
}
