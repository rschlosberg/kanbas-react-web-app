export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <p>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      </p>
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} /><br /><br />
          </td>
        </tr>
         <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
                <option selected value="Publish All">Publish All</option>
            </select><br /><br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as </label>
          </td>
          <td>
            <select id="wd-display-grade-as">
                <option selected value="Percentage">Percentage</option>
            </select><br /><br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
                <option selected >Online</option>
            </select><br /><br />
          </td>
        </tr>     
        <tr>
          
          <td align="right" valign="top">
            <label>Online Entry Options</label>
          </td>
          <td>
            <input type="checkbox" name="check-entry-options" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="check-entry-options" id="wd-website-url	"/>
            <label htmlFor="wd-website-url	">Website URL</label><br/>

            <input type="checkbox" name="check-entry-options" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" name="check-entry-options" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="check-entry-options" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label><br/><br />
           </td> 
         
        </tr>
         <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label><br /><br />
          </td>
          <td>
            <input id="wd-assign-to" value={"Everyone"} /><br /><br />
          </td>
        </tr>
          <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label><br /><br />
          </td>
          <td>
            <input type="date" id="wd-due-date" value="2024-05-13"/><br /><br />
          </td>
        </tr>
   
          <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label><br /><br />
          </td>
          <td>
            <input type="date" id="wd-available-from" value="2024-05-06"/><br /><br />
          </td>
      
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Until</label>
          </td>
          <td>
            <input type="date" id="wd-available-until" value="2024-05-20"/><br /><br />
          </td>
        </tr>
        
        {/* Complete on your own */}
        
      </table>
    </div>
  );}