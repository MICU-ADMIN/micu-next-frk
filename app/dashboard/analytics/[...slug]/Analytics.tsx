"use client";

import { Card, Title, Text, Grid } from "@tremor/react";
import { Issues } from "../slots/issues";
import { Website } from "../slots/website";
import Usage from "../slots/usage";
import SocialMedia from "../slots/socialMedia";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import SideBarLayout from "@/app/components/__Layouts/homesidebar";
import { Loader } from "react-feather";
import { Toaster } from "react-hot-toast";

export default function Analytics() {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  return (
    <Grid numItemsMd={2} className="mt-6 gap-6">
      <Issues />
      <Website />
      <Usage />
      <SocialMedia />
    </Grid>
  );
}
