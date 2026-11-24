export interface UpstreamContribution {
  repository: string;
  name: string;
  kind: string;
  pull: number;
  summary: string;
  featured?: boolean;
}

/** Verified merged examples, not a count of every contribution or an endorsement. */
export const upstreamContributions: readonly UpstreamContribution[] = [
  { repository: "CherryHQ/cherry-studio", name: "Cherry Studio", kind: "Desktop reliability", pull: 25286, summary: "Fixed a shell-environment edge case that could stop Work conversations and MCP tools from launching.", featured: true },
  { repository: "LibrePhotos/librephotos", name: "LibrePhotos", kind: "Product engineering", pull: 3106, summary: "Added expiring photo-share links so a share can have a clear end date.", featured: true },
  { repository: "nextcloud/spreed", name: "Nextcloud Talk", kind: "Federation", pull: 20467, summary: "Added reaction notifications for fully subscribed users in federated conversations.", featured: true },
  { repository: "jason5ng32/MyIP", name: "MyIP", kind: "Connectivity", pull: 579, summary: "Refreshed the India site list used by the connectivity checker.", featured: true },
  { repository: "rasonyang/ai-native-callcenter", name: "AI Native Callcenter", kind: "Voice infrastructure", pull: 683, summary: "Added a fill-in template and clearer file requirements to the campaign import dialog.", featured: true },
  { repository: "C4rohan/Lampline", name: "Lampline", kind: "Test infrastructure", pull: 124, summary: "Tightened JUnit output and added a CI publishing example for VoiceKit tests.", featured: true },
  { repository: "ArcReel/ArcReel", name: "ArcReel", kind: "Documentation", pull: 3995, summary: "Documented agent protocol requirements and external gateway setup." },
  { repository: "lingdojo/kana-dojo", name: "Kana Dojo", kind: "Community", pull: 20972, summary: "Contributed a community note." },
  { repository: "flisk-sh/flisk", name: "Flisk", kind: "Developer tooling", pull: 5330, summary: "Refactored the startup command into an ordered pipeline." },
  { repository: "MNSBaanu/OpenPlan", name: "OpenPlan", kind: "Product engineering", pull: 52, summary: "Added an upcoming-tasks report." },
  { repository: "Code-Amadeus/Amadeus", name: "Amadeus", kind: "State management", pull: 313, summary: "Preserved foreground-published status answers for repeat queries." },
  { repository: "streamcoreai/streamcore-server", name: "Streamcore", kind: "Contributor experience", pull: 89, summary: "Added issue and pull request templates and expanded the contribution guide." },
  { repository: "soroban-forge-labs/soroban-lens", name: "Soroban Lens", kind: "Build reliability", pull: 276, summary: "Restored the ingest build after an upstream change." },
  { repository: "architsharm/agentfox", name: "AgentFox", kind: "CLI tooling", pull: 232, summary: "Added JSON output to the policy-list command." },
  { repository: "Stellar-Hive/stellar-stream-hive-frontend", name: "Stellar Stream Hive", kind: "Testing", pull: 319, summary: "Added tests for amount formatting and token selection." },
  { repository: "marcus-beauregard/staticgen", name: "Staticgen", kind: "Rendering", pull: 20, summary: "Extended Markdown rendering to heading levels three through six." },
  { repository: "shamilahmdt/devtasks", name: "Devtasks", kind: "Developer tooling", pull: 232, summary: "Added a client-side QR code generator." },
];

export const upstreamRepoUrl = (item: UpstreamContribution) => `https://github.com/${item.repository}`;
export const upstreamPullUrl = (item: UpstreamContribution) => `${upstreamRepoUrl(item)}/pull/${item.pull}`;
