import type { Props } from "./Decisions";
import type Decision from "../../interfaces/decision.interface";
import ListDecisionsItem from "./ListDecisionsItem";

const ListDecisions = ({ decisions, putDecisionOutcome }: Props) => {
  return (
    <>
      {decisions?.map((decision: Decision) => (
        <ListDecisionsItem
          decision={decision}
          key={decision.id}
          putDecisionOutcome={putDecisionOutcome}
        />
      ))}
    </>
  );
};

export default ListDecisions;
