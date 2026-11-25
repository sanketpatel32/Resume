const gh = "https://github.com/sanketpatel32";

export default function ProjectCases() {
  return (
    <>
      <article className="sy-vault" aria-labelledby="sy-vault-title">
        <div className="sy-vault-copy">
          <p className="sy-label"><span>02</span> Searchable UI library</p>
          <h3 id="sy-vault-title">UI Vault</h3>
          <p>I built a catalogue for finding UI components across different creators. Filter by pattern, source, or license, then open a live preview.</p>
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
        <article className="sy-project sy-small" aria-labelledby="sy-small">
          <div className="sy-http">
            <div className="sy-http-title"><code>GET /lab/cache</code><span>HTTP LAB</span></div>
            <div className="sy-http-exchange">
              <div><span>FIRST REQUEST</span><strong>200 <small>OK</small></strong><code>ETag + JSON</code></div>
              <b aria-hidden="true">→</b>
              <div><span>SAME ETAG</span><strong>304 <small>NOT MODIFIED</small></strong><code>Empty body</code></div>
            </div>
          </div>
          <div className="sy-project-copy">
            <p className="sy-label"><span>04</span> Go · SQLite · OpenAPI</p>
            <h3 id="sy-small">Small Server</h3>
            <p>One Go binary for testing webhooks and HTTP. It saves payloads to SQLite and includes a cache lab that shows when a server can skip resending a response.</p>
            <div className="sy-case-links"><a href={`${gh}/Small-server`}>Source <span aria-hidden="true" className="sy-ne"/></a><a href={`${gh}/Small-server/blob/052726757207700e210946e4565d8bbf2a940dcc/lab.go#L104-L116`}>Read the cache handler <span aria-hidden="true" className="sy-ne"/></a></div>
          </div>
        </article>
      </div>
      <aside className="sy-bench">
        <p className="sy-label">Also built</p>
        <p><a href={`${gh}/Portal`}>AuraFlow <span aria-hidden="true" className="sy-ne"/></a><span>A self-hosted workspace for developer tools, powered by Bun and WebSockets.</span></p>
      </aside>
    </>
  );
}
