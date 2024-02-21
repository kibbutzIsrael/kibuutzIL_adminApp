import { Nav, Tab } from "react-bootstrap";
import OrganizationsCRM from "./OrganizationsCRM";
import OrganizationsFormsCRM from "./OrganizationsFormsCRM";

const Organizations = () => {
   return (
      <div className="default-tab">
         <Tab.Container defaultActiveKey="organizations">
            <Nav as="ul" className="nav-tabs">
               <Nav.Item as="li">
                  <Nav.Link eventKey={"organizations"} className="p-3">
                     <i class="bi bi-building me-2"></i>
                     Organizations
                  </Nav.Link>
               </Nav.Item>

               <Nav.Item as="li">
                  <Nav.Link eventKey={"organizations-forms"} className="p-3">
                     <i class="bi bi-file-earmark me-2"></i>
                     Organizations Forms
                  </Nav.Link>
               </Nav.Item>
            </Nav>
            <Tab.Content className="pt-4">
               <Tab.Pane eventKey="organizations">
                  <OrganizationsCRM />
               </Tab.Pane>

               <Tab.Pane eventKey="organizations-forms">
                  <OrganizationsFormsCRM />
               </Tab.Pane>
            </Tab.Content>
         </Tab.Container>
      </div>
   );
};
export default Organizations;
