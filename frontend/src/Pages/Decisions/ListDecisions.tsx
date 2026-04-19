import { Accordion, AccordionTab } from "primereact/accordion";
import type { Props } from "./Decisions";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";

const ListDecisions = ({ decisions }: Props) => {
  return (
    <>
      <Accordion activeIndex={0}>
        {decisions?.map((decision) => (
          <AccordionTab
            key={decision.id}
            header={
              <span className="flex align-items-center gap-2 w-full">
                <span className="font-bold white-space-nowrap">
                  {decision.title}
                </span>
                <Badge value={decision.outcome} className="ml-auto mr-5" />
              </span>
            }
          >
            <div className="grid align-items-center">
              <div className="col-12 lg:col-6">
                <p className="font-semibold">Variables</p>
                <p> Niveau de confiance</p>
                  <Rating value={decision.confidence * 10} stars={10} readOnly cancel={false} />
                  
                <p>Impact</p>
                  <Rating value={decision.importance} stars={4} readOnly cancel={false} />
                
              </div>
              <div className="col-12 text-center lg:col-6">
                <p className="font-semibold">Évaluer la décision</p>
                <div className="flex justify-content-center">
                  <Button
                    label="Bonne"
                    severity="success"
                    icon="pi pi-check"
                    className="mr-3"
                  />
                  <Button
                    label="Mauvaise"
                    severity="danger"
                    icon="pi pi-trash"
                  />
                </div>
              </div>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
    </>
  );
};

export default ListDecisions;
