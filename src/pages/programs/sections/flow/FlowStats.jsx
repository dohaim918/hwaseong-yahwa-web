import ProgramStatsBar from "@/pages/programs/ProgramStatsBar"

export default function FlowStats({
  stats,
  labels,
  icons,
  accent,
  animIn,
  routeLabel,
  onRoute,
}) {
  const items = [
    { key: "totalTime", icon: icons.time, label: labels.totalTime, value: stats.totalTime },
    { key: "walkDist", icon: icons.walk, label: labels.walkDist, value: stats.walkDist },
    { key: "viewerAge", icon: icons.age, label: labels.viewerAge, value: stats.viewerAge },
    {
      key: "difficulty",
      icon: icons.difficulty,
      label: labels.difficulty,
      value: stats.difficulty,
      gaugeValue: stats.difficultyLevel,
    },
  ]

  return (
    <ProgramStatsBar
      items={items}
      accent={accent}
      animIn={animIn}
      actionLabel={routeLabel}
      onAction={onRoute}
    />
  )
}
