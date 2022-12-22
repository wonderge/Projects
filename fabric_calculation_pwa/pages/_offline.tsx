import { NextPage } from "next";
import CardContainer from "../components/CardContainer";
import { PageProps } from "../types/PageProps";

const Offline: NextPage<PageProps> = ({ labels }) => {
  const { Offline } = labels;
  return (
    <CardContainer>
      <p>{Offline}</p>
    </CardContainer>
  )
}

export default Offline