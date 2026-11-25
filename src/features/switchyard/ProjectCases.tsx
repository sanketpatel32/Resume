const gh = "https://github.com/sanketpatel32";

export default function ProjectCases() {
  return (
    <>
      <article className="sy-vault" aria-labelledby="sy-vault-title">
        <div className="sy-vault-copy">
          <p className="sy-label"><span>02</span> Searchable UI library</p>
          <h3 id="sy-vault-title">UI Vault</h3>
          <p>Interface inspiration shouldn’t mean thirty open tabs. I built the catalogue that makes components from different creators searchable by pattern, source and license.</p>
          <dl className="sy-vault-stats"><div><dt>3,157</dt><dd>indexed entries</dd></div><div><dt>33</dt><dd>sources</dd></div><div><dt>766</dt><dd>live previews</dd></div></dl>
          <div className="sy-case-links"><a href="https://sanketpatel32.github.io/ui-vault/">Explore the catalogue <span aria-hidden="true" className="sy-ne"/></a><a href={`${gh}/ui-vault`}>Source <span aria-hidden="true" className="sy-ne"/></a></div>
        </div>
        <div className="sy-vault-visual" aria-hidden="true">
          <div className="sy-vault-toolbar"><span>◈ &nbsp; UI VAULT</span><span><i/> INDEX</span></div>
          <div className="sy-vault-search">⌕ &nbsp; Find a component<span>FILTERS ↘</span></div>
          <div className="sy-vault-patterns">
            <div><b>01 &nbsp; INPUTS</b><i/><i/><i/></div>
            <div><b>02 &nbsp; MOTION</b><svg viewBox="0 0 100 56" fill="none"><path d="M3 45C10 45 26 6 42 6c13 0 12 40 26 40C81 46 90 15 97 9" stroke="currentColor" strokeWidth="2.5"/><circle cx="42" cy="6" r="4" fill="currentColor"/><circle cx="68" cy="46" r="4" fill="currentColor"/></svg></div>
            <div><b>03 &nbsp; LAYOUT</b><span><i/><i/><i/><i/></span></div>
          </div>
          <p>CATALOGUE STUDY · ILLUSTRATION</p>
        </div>
      </article>
      <div className="sy-pair">
        <article className="sy-project sy-blunt" aria-labelledby="sy-blunt">
          <div className="sy-graphic sy-bluntflow" aria-hidden="true">
            <span><small>01</small>Review locally</span><b>→</b><span><small>02</small>Triage</span><b>→</b><span><small>03</small>Export</span>
          </div>
          <div className="sy-project-copy">
            <p className="sy-label"><span>03</span> Go · React · SQLite</p>
            <h3 id="sy-blunt">Blunt Code</h3>
            <p>A local code-review workbench with a browser UI and CLI. It keeps findings in SQLite, compares them to a baseline, and exports SARIF for other tools.</p>
            <div className="sy-case-links"><a href={`${gh}/Blunt-code`}>Source <span aria-hidden="true" className="sy-ne"/></a><a href={`${gh}/Blunt-code/releases/tag/v0.52.0`}>Windows release <span aria-hidden="true" className="sy-ne"/></a></div>
          </div>
        </article>
        <article className="sy-project sy-yume" aria-labelledby="sy-yume">
          <div className="sy-graphic sy-dock-art" aria-hidden="true">
            <div className="sy-dock-window"><i/><i/><i/><span>WINDOWS 11 / RUST</span></div>
            <div className="sy-dock"><span>⊞</span><span>▥</span><span>⌘</span><span>◒</span><span>◇</span></div>
          </div>
          <div className="sy-project-copy">
            <p className="sy-label"><span>04</span> Rust · Direct2D · DirectComposition</p>
            <h3 id="sy-yume">YumeDock</h3>
            <p>A native Windows 11 dock, built in Rust. It renders with Direct2D and DirectComposition and can import existing taskbar pins.</p>
            <div className="sy-case-links"><a href={`${gh}/YumeDock`}>Source <span aria-hidden="true" className="sy-ne"/></a><a href={`${gh}/YumeDock/releases/tag/latest`}>Windows release <span aria-hidden="true" className="sy-ne"/></a></div>
          </div>
        </article>
      </div>
      <div className="sy-bench">
        <p className="sy-label">Also on the workbench</p>
        <div>
          <a href={`${gh}/Small-server`}><strong>Small Server <span aria-hidden="true" className="sy-ne"/></strong><span>One Go binary for webhooks and HTTP experiments, including ETags at /lab/cache.</span></a>
          <a href={`${gh}/Portal`}><strong>AuraFlow <span aria-hidden="true" className="sy-ne"/></strong><span>A self-hosted workspace: REST, WebSockets and everyday developer utilities on Bun.</span></a>
        </div>
      </div>
    </>
  );
}
