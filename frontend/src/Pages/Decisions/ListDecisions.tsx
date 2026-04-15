import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { Props } from "./Decisions";

const ListDecisions = ({decisions}: Props) => {
  return (
    <>
      <DataTable value={decisions}>
        <Column field="title" header="Décision prise"></Column>
        <Column field="confidence" header="Confiance"></Column>
        <Column field="importance" header="Impact"></Column>
        <Column field="outcome" header="Résultat"></Column>
      </DataTable>
    </>
  );
};

export default ListDecisions;
