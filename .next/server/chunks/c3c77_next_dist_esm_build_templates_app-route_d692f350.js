module.exports=[66080,e=>{"use strict";var t=e.i(5031),i=e.i(43571),n=e.i(39800),a=e.i(43737),s=e.i(37669),o=e.i(14713),r=e.i(24760),l=e.i(28533),c=e.i(80334),d=e.i(9101),p=e.i(52866),u=e.i(82569),m=e.i(13653),h=e.i(95014),g=e.i(28203),f=e.i(93695);e.i(21349);var y=e.i(79378),v=e.i(78712),b=e.i(98042);let x={name:"Apex Integrator",title:"The Apex Integrator",description:"You combine high strategic vision with robust operational capability. AI is becoming your competitive moat.",hook:"We are the 1%. AI is our competitive moat.",color:"#7c3aed"},R={name:"Visionary Architect",title:"The Visionary Architect",description:"You have a clear strategic direction, but your operational foundation needs strengthening to execute that vision.",hook:"We know exactly where we going.",color:"#3b82f6"},A={name:"Tactical Powerhouse",title:"The Tactical Powerhouse",description:"You have strong technical muscles and data capability, but lack the unified strategic direction to maximize ROI.",hook:"We are an execution machine.",color:"#f59e0b"},w={name:"Calculated Scout",title:"The Calculated Scout",description:"You are in the early stages, observing and planning. You prioritize prudence over speed.",hook:"We measure twice, cut once.",color:"#64748b"};function I(e,t){let i=t.map(t=>e[t]).filter(e=>void 0!==e);return 0===i.length?0:Math.round(i.reduce((e,t)=>e+t,0)/i.length)}var C=e.i(2505);let k=process.env.RESEND_API_KEY||"",E=k?new C.Resend(k):null,S=process.env.ANTHROPIC_API_KEY||"";async function $(e){try{let t,i,n,{companyData:a,answers:s,companyInsights:o}=await e.json();if(!a||!s)return v.NextResponse.json({error:"Missing required fields"},{status:400});if(!a.name||!a.website||!a.email)return v.NextResponse.json({error:"Company name, website, and email are required"},{status:400});if("object"!=typeof s||Array.isArray(s))return v.NextResponse.json({error:"Invalid answers payload"},{status:400});let r=[{dimension:"Leadership & Strategy",score:I(s,Object.keys(s).filter(e=>e.startsWith("l"))),weight:.2},{dimension:"Data Readiness",score:I(s,Object.keys(s).filter(e=>e.startsWith("d"))),weight:.25},{dimension:"Technology Infrastructure",score:I(s,Object.keys(s).filter(e=>e.startsWith("t"))),weight:.15},{dimension:"Talent & Capability",score:I(s,Object.keys(s).filter(e=>e.startsWith("ta"))),weight:.15},{dimension:"Governance & Responsible AI",score:I(s,Object.keys(s).filter(e=>e.startsWith("g"))),weight:.1},{dimension:"Culture & Change Readiness",score:I(s,Object.keys(s).filter(e=>e.startsWith("c"))),weight:.15}],l=Math.round(r.reduce((e,t)=>e+t.score*t.weight,0)),c=l<20?{level:"Not Ready",color:"#ef4444",timeline:"18-24 months",successRate:"15-20%"}:l<40?{level:"Early Stage",color:"#f97316",timeline:"12-18 months",successRate:"35-50%"}:l<60?{level:"Developing",color:"#eab308",timeline:"12-18 months",successRate:"60-75%"}:l<80?{level:"Ready to Accelerate",color:"#22c55e",timeline:"9-12 months",successRate:"75-85%"}:{level:"Advanced",color:"#3b82f6",timeline:"6-9 months",successRate:"85-95%"},d=(t=[],r.forEach(e=>{e.score<40&&("Data Readiness"===e.dimension?t.push({dimension:e.dimension,issue:"Poor data quality and governance",impact:"52-98% of organizations cite this as top blocker",costRange:"$300K-$2M",timeline:"12-24 months",priority:"high"}):"Technology Infrastructure"===e.dimension?t.push({dimension:e.dimension,issue:"Legacy system integration challenges",impact:"93% blocked by integration issues",costRange:"$150K-$500K",timeline:"6-12 months",priority:"high"}):"Talent & Capability"===e.dimension&&t.push({dimension:e.dimension,issue:"Lack of internal AI expertise",impact:"52% lack talent and skills",costRange:"$150K-$500K",timeline:"6-12 months",priority:"high"})),e.score<60&&("Leadership & Strategy"===e.dimension?t.push({dimension:e.dimension,issue:"No clear AI strategy or executive sponsor",impact:"Strategy gaps predict 70% slower progress",costRange:"$50K-$200K",timeline:"3-6 months",priority:"medium"}):"Culture & Change Readiness"===e.dimension&&t.push({dimension:e.dimension,issue:"Employee resistance and fear of AI",impact:"Adoption drops to 20-30% without addressing",costRange:"$50K-$200K",timeline:"6-12 months",priority:"medium"})),e.score<50&&"Governance & Responsible AI"===e.dimension&&t.push({dimension:e.dimension,issue:"No AI governance framework",impact:"Only 43% have governance policy",costRange:"$50K-$200K",timeline:"2-3 months",priority:"medium"})}),t.sort((e,t)=>{let i={high:0,medium:1,low:2};return i[e.priority]-i[t.priority]})),p=(i=[],l<40?(i.push({phase:"Phase 1: Foundation",title:"Establish AI Strategy and Governance",description:"Build foundational strategy, assign executive sponsor, and create governance framework.",actions:["Develop and document AI strategy with clear KPIs","Appoint C-suite AI sponsor","Create data governance framework with ownership","Establish responsible AI policies"],timeframe:"2-3 months"}),i.push({phase:"Phase 2: Data Readiness",title:"Improve Data Quality and Accessibility",description:"Centralize data, improve quality monitoring, and catalog data assets.",actions:["Implement data catalog and metadata management","Deploy automated data quality monitoring","Create data warehouse/lakehouse for centralized access","Establish data ownership and stewardship"],timeframe:"3-6 months"})):l<60?(i.push({phase:"Phase 1: Acceleration",title:"Close Readiness Gaps",description:"Address specific blockers and accelerate AI adoption.",actions:["Prioritize and fix highest-impact blockers","Build first production use case","Deploy change management program","Upskill teams with AI literacy training"],timeframe:"3-6 months"}),i.push({phase:"Phase 2: Scale",title:"Deploy Additional Use Cases",description:"Expand from 1-2 use cases to 5-10 across the organization.",actions:["Identify and prioritize next 2-3 use cases","Build reusable AI components","Create internal AI champion program","Establish MLOps for production deployment"],timeframe:"6-12 months"})):i.push({phase:"Phase 1",title:"AI Center of Excellence",description:"Establish centralized AI capabilities and governance.",actions:["Define AI CoE charter and operating model","Recruit or designate AI leadership roles","Set up AI governance framework"],timeframe:"0-3 months"},{phase:"Phase 2",title:"Cross-Functional Alignment",description:"Create governance structure and stakeholder buy-in.",actions:["Form AI governance council with cross-functional leaders","Establish AI ethics and risk management policies","Define success metrics and KPIs"],timeframe:"3-6 months"},{phase:"Phase 3",title:"Platform & Architecture",description:"Build scalable AI infrastructure and tooling.",actions:["Design AI platform architecture (MLOps, data pipelines)","Select and implement AI/ML tooling stack","Create reusable AI components library"],timeframe:"6-9 months"},{phase:"Phase 4",title:"Organization-Wide Scaling",description:"Deploy change management and expand AI across departments.",actions:["Launch AI training programs for all employees","Scale from 3-5 to 10+ AI use cases","Implement continuous improvement feedback loops"],timeframe:"9-12 months"}),i),u=(n=r.reduce((e,t)=>({...e,[t.dimension]:t.score}),{}),{vision:Math.round(((n["Leadership & Strategy"]||0)+(n["Culture & Change Readiness"]||0)+(n["Governance & Responsible AI"]||0))/3),ops:Math.round(((n["Data Readiness"]||0)+(n["Technology Infrastructure"]||0)+(n["Talent & Capability"]||0))/3)}),m=function(e){let{vision:t,ops:i}=e;return t>=50&&i>=50?x:t>=50&&i<50?R:t<50&&i>=50?A:w}(u),h="";if(S&&o?.company_summary)try{let e=r.filter(e=>e.score>=70).map(e=>e.dimension).join(", "),t=d.map(e=>e.dimension).join(", "),i=`You are analyzing an AI readiness assessment for ${a.name}.

COMPANY CONTEXT (from website analysis):
${o.company_summary}

${o.ai_maturity?.signals?`Website signals detected:
${o.ai_maturity.signals.join("\n")}`:""}

ASSESSMENT RESULTS:
- Overall AI Readiness: ${l}/100
- AI Archetype: ${m.name} - "${m.hook}"
- Strategic Vision Score: ${u.vision}/100
- Operational Capability Score: ${u.ops}/100

Key Strengths: ${e||"Building foundational capabilities"}
Critical Gaps: ${t||"No critical blockers identified"}

TASK: Generate a highly personalized 3-paragraph analysis that:

**Paragraph 1 - Industry Context & Opportunities:**
- Reference specific details from their website/business
- Identify 2-3 AI opportunities tailored to their industry and current state
- Show you understand their market positioning

**Paragraph 2 - Realistic Challenges:**
- Based on their ${m.name} profile, what friction points will they face?
- What gaps need addressing before scaling AI?
- Be specific to their dimension scores and detected signals

**Paragraph 3 - Actionable Starting Point:**
- Given their ${u.vision} vision and ${u.ops} ops scores, where should they start?
- Recommend 1-2 specific first initiatives
- Connect back to their identified strengths

Tone: Professional consultant speaking directly to the company ("you", "your organization")
Length: 2-3 sentences per paragraph
Style: Conversational but authoritative - show domain expertise

Format as clean markdown:
- Use **bold** for emphasis on key terms
- No headers (just 3 paragraphs)
- No bullet points in the main text`,n=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":S,"Content-Type":"application/json","anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-5-20250929",max_tokens:800,messages:[{role:"user",content:i}]})});if(n.ok){let e=await n.json(),t=e?.content?.[0]?.text;"string"==typeof t&&t.trim()&&(h=t.trim())}}catch(e){console.error("Error generating industry analysis:",e)}let g={company_name:a.name,website:a.website,linkedin:a.linkedin||"",email:a.email,dimension_scores:r.reduce((e,t)=>({...e,[t.dimension]:t.score}),{}),overall_score:l,readiness_level:c.level,blockers:d,recommendations:p,company_insights:o||null,archetype:m,axis_scores:u},{success:f,data:y}=await (0,b.saveAssessment)(g);if(!f)return v.NextResponse.json({error:"Failed to save assessment"},{status:500});return P(a.email,{overallScore:l,readiness:c,dimensionScores:r,blockers:d,recommendations:p,archetype:m}).catch(e=>console.error("Background email error:",e)),v.NextResponse.json({success:!0,assessmentId:y?.[0]?.id,report:{overallScore:l,readiness:c,dimensionScores:r,blockers:d,recommendations:p,archetype:m,axisScores:u,companyData:a,companyInsights:o||null,industryAnalysis:h||null}})}catch(e){return console.error("Assessment submission error:",e),v.NextResponse.json({error:"Internal server error"},{status:500})}}async function P(e,t){try{var i;if(!E)return void console.warn("RESEND_API_KEY is not configured. Skipping email delivery.");let{data:n,error:a}=await E.emails.send({from:"John Ellison <no-reply@updates.john-ellison.com>",to:e,cc:"john@john-ellison.com",subject:"Your AI Readiness Assessment Report",html:(i=t,`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Inter', sans-serif; background: #0c0c10; color: #fff; margin: 0; padding: 40px 20px; }
          .container { max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 40px; }
          .score-display { background: linear-gradient(135deg, #7c3aed, #3b82f6); padding: 30px; border-radius: 12px; margin: 30px 0; }
          .score-value { font-size: 72px; font-weight: 700; color: #fff; }
          .score-label { font-size: 18px; opacity: 0.9; }
          .section { margin: 30px 0; padding: 24px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
          .section-title { font-size: 24px; font-weight: 600; margin-bottom: 20px; }
          .dimension { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .dimension-name { font-size: 16px; }
          .dimension-score { font-size: 32px; font-weight: 700; }
          .blocker { background: rgba(239, 68, 68, 0.1); padding: 16px; border-radius: 8px; margin: 12px 0; border-left: 3px solid #ef4444; }
          .blocker-title { font-weight: 600; margin-bottom: 8px; }
          .recommendation { background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 3px solid #22c55e; }
          .cta { text-align: center; margin: 40px 0; }
          .btn { display: inline-block; background: #7c3aed; color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your AI Readiness Assessment</h1>
            <p>Here's your personalized report based on the 40 questions you completed.</p>
          </div>

          <div class="score-display">
            <div class="score-value">${i.overallScore}/100</div>
            <div class="score-label">${i.readiness.level}</div>
          </div>

          <div class="section">
            <div class="section-title">Dimension Scores</div>
            ${i.dimensionScores.map(e=>`
              <div class="dimension">
                <span class="dimension-name">${e.dimension}</span>
                <span class="dimension-score">${e.score}/100</span>
              </div>
            `).join("")}
          </div>

          <div class="section">
            <div class="section-title">Top Blockers</div>
            ${i.blockers.map(e=>`
              <div class="blocker">
                <div class="blocker-title">${e.dimension}: ${e.issue}</div>
                <p><strong>Impact:</strong> ${e.impact}</p>
                <p><strong>Cost to Fix:</strong> ${e.costRange}</p>
                <p><strong>Timeline:</strong> ${e.timeline}</p>
              </div>
            `).join("")}
          </div>

          <div class="section">
            <div class="section-title">Recommendations</div>
            ${i.recommendations.map(e=>`
              <div style="margin: 20px 0;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">${e.phase}: ${e.title}</h3>
                <p style="margin-bottom: 16px;">${e.description}</p>
                <ul>
                  ${e.actions.map(e=>`<li style="padding: 8px 0;">• ${e}</li>`).join("")}
                </ul>
                <p style="font-size: 14px; opacity: 0.8;">Timeframe: ${e.timeframe}</p>
              </div>
            `).join("")}
          </div>

          <div class="cta">
            <a href="https://calendar.app.google/wirgV6a4Vcz7cZAcA" class="btn">Schedule Strategy Call</a>
            <p style="margin-top: 16px; opacity: 0.7; font-size: 14px;">
              Let's discuss your results and build your transformation roadmap.
            </p>
          </div>
        </div>
      </body>
    </html>
  `)});a&&console.error("Email send error:",a)}catch(e){console.error("Exception sending email:",e)}}e.s(["POST",()=>$],3818);var T=e.i(3818);let N=new t.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/assessments/route",pathname:"/api/assessments",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/Sites/john-ellison.com/app/api/assessments/route.ts",nextConfigOutput:"",userland:T}),{workAsyncStorage:O,workUnitAsyncStorage:j,serverHooks:_}=N;function D(){return(0,n.patchFetch)({workAsyncStorage:O,workUnitAsyncStorage:j})}async function K(e,t,n){N.isDev&&(0,a.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let v="/api/assessments/route";v=v.replace(/\/index$/,"")||"/";let b=await N.prepare(e,t,{srcPage:v,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:x,params:R,nextConfig:A,parsedUrl:w,isDraftMode:I,prerenderManifest:C,routerServerContext:k,isOnDemandRevalidate:E,revalidateOnlyGenerated:S,resolvedPathname:$,clientReferenceManifest:P,serverActionsManifest:T}=b,O=(0,r.normalizeAppPath)(v),j=!!(C.dynamicRoutes[O]||C.routes[$]),_=async()=>((null==k?void 0:k.render404)?await k.render404(e,t,w,!1):t.end("This page could not be found"),null);if(j&&!I){let e=!!C.routes[$],t=C.dynamicRoutes[O];if(t&&!1===t.fallback&&!e){if(A.experimental.adapterPath)return await _();throw new f.NoFallbackError}}let D=null;!j||N.isDev||I||(D="/index"===(D=$)?"/":D);let K=!0===N.isDev||!j,z=j&&!K;T&&P&&(0,o.setManifestsSingleton)({page:v,clientReferenceManifest:P,serverActionsManifest:T});let M=e.method||"GET",U=(0,s.getTracer)(),q=U.getActiveScopeSpan(),H={params:R,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!A.experimental.authInterrupts},cacheComponents:!!A.cacheComponents,supportsDynamicResponse:K,incrementalCache:(0,a.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:A.cacheLife,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,i,n,a)=>N.onRequestError(e,t,n,a,k)},sharedContext:{buildId:x}},L=new l.NodeNextRequest(e),F=new l.NodeNextResponse(t),W=c.NextRequestAdapter.fromNodeNextRequest(L,(0,c.signalFromNodeResponse)(t));try{let o=async e=>N.handle(W,H).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let i=U.getRootSpanAttributes();if(!i)return;if(i.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${i.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=i.get("next.route");if(n){let t=`${M} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${M} ${v}`)}),r=!!(0,a.getRequestMeta)(e,"minimalMode"),l=async a=>{var s,l;let c=async({previousCacheEntry:i})=>{try{if(!r&&E&&S&&!i)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await o(a);e.fetchMetrics=H.renderOpts.fetchMetrics;let l=H.renderOpts.pendingWaitUntil;l&&n.waitUntil&&(n.waitUntil(l),l=void 0);let c=H.renderOpts.collectedTags;if(!j)return await (0,u.sendResponse)(L,F,s,H.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(s.headers);c&&(t[g.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let i=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,n=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:i,expire:n}}}}catch(t){throw(null==i?void 0:i.isStale)&&await N.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:z,isOnDemandRevalidate:E})},!1,k),t}},d=await N.handleResponse({req:e,nextConfig:A,cacheKey:D,routeKind:i.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:E,revalidateOnlyGenerated:S,responseGenerator:c,waitUntil:n.waitUntil,isMinimalMode:r});if(!j)return null;if((null==d||null==(s=d.value)?void 0:s.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});r||t.setHeader("x-nextjs-cache",E?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),I&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let f=(0,m.fromNodeOutgoingHttpHeaders)(d.value.headers);return r&&j||f.delete(g.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||f.get("Cache-Control")||f.set("Cache-Control",(0,h.getCacheControlHeader)(d.cacheControl)),await (0,u.sendResponse)(L,F,new Response(d.value.body,{headers:f,status:d.value.status||200})),null};q?await l(q):await U.withPropagatedContext(e.headers,()=>U.trace(d.BaseServerSpan.handleRequest,{spanName:`${M} ${v}`,kind:s.SpanKind.SERVER,attributes:{"http.method":M,"http.target":e.url}},l))}catch(t){if(t instanceof f.NoFallbackError||await N.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:z,isOnDemandRevalidate:E})},!1,k),j)throw t;return await (0,u.sendResponse)(L,F,new Response(null,{status:500})),null}}e.s(["handler",()=>K,"patchFetch",()=>D,"routeModule",()=>N,"serverHooks",()=>_,"workAsyncStorage",()=>O,"workUnitAsyncStorage",()=>j],66080)}];

//# sourceMappingURL=c3c77_next_dist_esm_build_templates_app-route_d692f350.js.map