import type { ListDecisionsItemProps } from "./Decisions";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { individualAccuracyScore } from "../../helpers/scores";
import { classNames } from "primereact/utils";
import { Tag } from "primereact/tag";
import { Knob } from "primereact/knob";
import { useDecisions } from "../../hooks/useDecisions";
import { useEffect, useState } from "react";
import { commonStyles } from "../../helpers/styles";

const ListDecisionsItem = ({ decision }: ListDecisionsItemProps) => {
    const {putDecisionOutcome} = useDecisions();
    const [outcome, setOutcome] = useState<number | null>()

    const handleSubmit = (outcome: number, id: string) => {
        putDecisionOutcome({outcome, id})
        setOutcome(outcome)
    }

    useEffect(() => {
        setOutcome(decision.outcome)
    }, [])
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
                <span style={commonStyles.accent} />
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              {" "}
              <div>
                <div className="font-semibold">{outcome === null ? "Évaluer la décision" : "Score de précision"}</div>
                <div className="flex align-items-center mt-3">
                  {outcome === null && (
                    <>
                      <div className="flex justify-content-center">
                        <Button
                          label="Bonne"
                          severity="success"
                          icon="pi pi-check"
                          className="mr-3"
                          onClick={() => handleSubmit(1, decision.id)}
                        />
                        <Button
                          label="Mauvaise"
                          severity="danger"
                          icon="pi pi-trash"
                          onClick={() => handleSubmit(0, decision.id)}

                        />
                      </div>
                    </>
                  )}
                  {outcome === 0 && (
                    <Knob
                      value={
                        individualAccuracyScore(
                          decision.confidence,
                          outcome,
                        ) * 100
                      }
                      readOnly
                    />
                  )}
                  {outcome === 1 && (
                    <Knob
                      value={
                        individualAccuracyScore(
                          decision.confidence,
                          outcome,
                        ) * 100
                      }
                      readOnly
                    />
                  )}
                  <Tag className="ml-5" value={outcome}></Tag>
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
