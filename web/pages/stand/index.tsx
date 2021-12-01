import React from "react";
import * as Luker from "../../features/stand/luker";
import { useLuke } from "../../features/stand/useLuke";

export default function StandPage() {
  const { currentLuke } = useLuke();

  const Luke = lukeMapping[currentLuke - 1];

  return <Luke />;
}

const lukeMapping = [
  // Dag 1
  Luker.ApningsLuke,
  () => <Luker.DagensArtiklerLuke day={1} />,
  Luker.FagdagsminnerLuke,
  Luker.BekkProsjekterLuke,
  Luker.PelsedirektoratetLuke,
  Luker.BekkGjennomTideneLuke,
  Luker.TastekonkurranseLuke,
  Luker.LivetIBekkLuke,
  Luker.SluttenAvDagenLuke,

  // Dag 2
  Luker.RobinTalkLuke,
  () => <Luker.DagensArtiklerLuke day={2} />,
  Luker.GlitchOrDieLuke,
  Luker.SjokoladetidLuke,
  Luker.GenerativKunstLuke, // TODO: Denne må vi fikse på et vis
  Luker.HashtagEkteLuke,
  Luker.BekkFunFactsLuke,
  Luker.AtlasLuke,
  // TODO: En til her kanskje?
  Luker.SluttenAvDagenLuke,

  // Dag 3
  Luker.StartPaSisteDagLuke,
  () => <Luker.DagensArtiklerLuke day={3} />,
  Luker.UtviklervitserLuke,
  Luker.UuUtfordringenLuke,
  Luker.KlistremerkerLuke,
  Luker.BekkvortLuke,
  Luker.BekkalikesLuke,
  Luker.HobbyprosjekterLuke,
  Luker.LivetIBekkLuke,
  Luker.SluttenPaKonferansenLuke,
];
