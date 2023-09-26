"use client"

import CardContainer from "@components/CardContainer";
import { useTranslations } from "next-intl";

const Offline = () => {
  const t = useTranslations()
  return (
    <CardContainer>
      <p>{t("Offline")}</p>
    </CardContainer>
  )
}

export default Offline