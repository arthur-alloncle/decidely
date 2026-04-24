import type { ListDecisionsItemProps } from "./Decisions";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { individualAccuracyScore } from "../../helpers/scores";
import { classNames } from "primereact/utils";
import { Tag } from "primereact/tag";
import { Knob } from "primereact/knob";

const ListDecisionsItem = ({ decision }: ListDecisionsItemProps) => {
  return (
    <div className="grid">
      <div className="col-12">
        <div
          className={classNames(
            "flex flex-column xl:flex-row xl:align-items-start p-4 gap-4",
          )}
        >
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-xl font-bold text-900">{decision.title}</div>
              <div className="text-md">Confiance</div>
              <Rating
                value={decision.confidence * 10}
                readOnly
                stars={10}
                cancel={false}
              ></Rating>
              <div className="text-md">Importance</div>
              <Rating
                value={decision.importance}
                readOnly
                stars={4}
                cancel={false}
              ></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{decision.category_id}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              {" "}
              <div>
                <div className="font-semibold">Évaluer la décision</div>
                <div className="flex align-items-center mt-3">
                  {decision.outcome === null && (
                    <>
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
                    </>
                  )}
                  {decision.outcome === 0 && (
                    <Knob
                      value={
                        individualAccuracyScore(
                          decision.confidence,
                          decision.outcome,
                        ) * 100
                      }
                      readOnly
                    />
                  )}
                  {decision.outcome === 1 && (
                    <Knob
                      value={
                        individualAccuracyScore(
                          decision.confidence,
                          decision.outcome,
                        ) * 100
                      }
                      readOnly
                    />
                  )}
                  <Tag className="ml-5" value={decision.outcome}></Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDecisionsItem;
