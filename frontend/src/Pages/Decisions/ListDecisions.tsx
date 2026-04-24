import type { Props } from "./Decisions";
import type Decision from "../../interfaces/decision.interface";
import ListDecisionsItem from "./ListDecisionsItem";

const ListDecisions = ({ decisions }: Props) => {
  return (
    <>
      {decisions?.map((decision: Decision) => (
        <ListDecisionsItem decision={decision} key={decision.id} />
      ))}
    </>
  );
};

export default ListDecisions;
