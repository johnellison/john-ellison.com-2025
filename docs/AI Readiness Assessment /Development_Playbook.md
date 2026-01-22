# AI Readiness Assessment Tool: Development Playbook
**For: Lead Generation & Transformation Pipeline**

---

## PART 1: ASSESSMENT ENGINE DESIGN (40-Question Framework)

### Dimension 1: Leadership & Strategy (7 questions) — Weight: 20%

```
1. Does your organization have a named executive sponsor or Chief AI Officer?
   a) Yes, with C-suite visibility (100%)
   b) Yes, but lower in organization (70%)
   c) Emerging role; not yet formalized (40%)
   d) No executive ownership (0%)

2. Is your AI strategy formally documented and approved by the C-suite?
   a) Yes, with 3-year budget commitment (100%)
   b) Yes, but budget approved annually (70%)
   c) In draft; not yet approved (40%)
   d) No formal strategy (0%)

3. Beyond "cost reduction," how are AI success metrics defined?
   a) User adoption rate, outcome improvement, ROI—all quantified (100%)
   b) Mix of qualitative and quantitative metrics (70%)
   c) Primary focus on cost reduction (40%)
   d) No success metrics defined (0%)

4. What % of your C-suite/leadership team actively use AI tools in their own work?
   a) 75%+ (100%)
   b) 50-75% (70%)
   c) 25-50% (40%)
   d) <25% or unknown (0%)

5. How is AI integrated into your strategic planning process?
   a) Core to annual strategy; discussed quarterly (100%)
   b) Discussed in strategic review; integrated into some initiatives (70%)
   c) Pilot projects; not yet strategic (40%)
   d) Not part of strategic planning (0%)

6. What's your organization's AI budget for the next 12 months?
   a) 3-5% of IT budget or dedicated line item (100%)
   b) 1-3% of IT budget (70%)
   c) <1% or project-based (40%)
   d) Minimal/undecided (0%)

7. How aligned is AI strategy with overall business goals?
   a) Deeply aligned; AI enables specific competitive advantages (100%)
   b) Aligned; supports strategic objectives (70%)
   c) Loosely aligned; opportunistic (40%)
   d) Unclear connection (0%)

Dimension 1 Score = (Q1+Q2+Q3+Q4+Q5+Q6+Q7) / 7
```

---

### Dimension 2: Data Readiness (8 questions) — Weight: 25%

```
1. What percentage of your enterprise data is documented in a data catalog?
   a) 80%+ (100%)
   b) 50-80% (70%)
   c) 20-50% (40%)
   d) <20% or none (0%)

2. How would you rate your organization's overall data quality?
   a) 80%+ data accurate/complete; automated quality monitoring (100%)
   b) 60-80% quality; some monitoring (70%)
   c) 40-60% quality; manual spot checks (40%)
   d) <40% or unknown (0%)

3. Is your data centralized (data warehouse/lake) or siloed?
   a) Centralized in cloud data warehouse/lake (100%)
   b) Majority centralized; some silos remain (70%)
   c) Mix of centralized and siloed (40%)
   d) Primarily siloed across legacy systems (0%)

4. Is data ownership clearly assigned (Chief Data Officer, data stewards)?
   a) Yes, formal governance roles and responsibilities (100%)
   b) Partially; some ownership assigned (70%)
   c) Emerging; not yet formalized (40%)
   d) No clear ownership (0%)

5. How long does it typically take to get access to needed data?
   a) <1 day; self-service; documented (100%)
   b) 1-3 days; some friction (70%)
   c) 1-2 weeks; significant bureaucracy (40%)
   d) >2 weeks or very difficult (0%)

6. Do you have automated data quality monitoring and alerting?
   a) Yes, for all critical data (100%)
   b) Yes, for most critical data (70%)
   c) Manual spot checks only (40%)
   d) No monitoring (0%)

7. How is your organization's data governance maturity for regulatory compliance?
   a) Mature framework; documented and enforced (100%)
   b) Framework in place; inconsistently enforced (70%)
   c) Emerging framework; gaps remain (40%)
   d) Minimal/no governance (0%)

8. What % of your team's time do analysts spend cleaning/preparing data vs. analysis?
   a) <20% on cleaning; 80%+ on analysis (100%)
   b) 20-40% on cleaning (70%)
   c) 40-60% on cleaning (40%)
   d) >60% on cleaning (0%)

Dimension 2 Score = (Q1+Q2+Q3+Q4+Q5+Q6+Q7+Q8) / 8
```

---

### Dimension 3: Technology Infrastructure (6 questions) — Weight: 15%

```
1. What's your organization's primary cloud platform maturity?
   a) Primary workloads on cloud (AWS/Azure/GCP); mature (100%)
   b) Significant workloads on cloud; maturing (70%)
   c) Pilot cloud projects; mostly on-premise (40%)
   d) Primarily on-premise; limited cloud (0%)

2. Do you have established CI/CD pipelines with automated testing?
   a) Yes, mature; most deployments automated (100%)
   b) Partially; some projects have CI/CD (70%)
   c) Emerging; manual deployments still common (40%)
   d) Primarily manual deployments (0%)

3. Which ML/AI platform have you adopted or are evaluating?
   a) Established platform (Databricks, Vertex AI, SageMaker, etc.) (100%)
   b) Some platform tooling; not yet standardized (70%)
   c) Evaluating options; no standardization (40%)
   d) No dedicated AI/ML platform (0%)

4. How does your infrastructure handle data security and access controls?
   a) Role-based access, encryption, audit trails; mature (100%)
   b) Access controls and encryption in place (70%)
   c) Basic security; gaps exist (40%)
   d) Minimal security controls (0%)

5. How many integrations exist between your AI/ML systems and operational systems?
   a) 5+ production AI integrations; APIs well-designed (100%)
   b) 3-4 integrations; some friction (70%)
   c) 1-2 integrations or pilots only (40%)
   d) No production AI integrations yet (0%)

6. What's your infrastructure readiness for scaling AI (containerization, orchestration)?
   a) Kubernetes/containerization mature; ready to scale (100%)
   b) Containers in use; some orchestration (70%)
   c) Exploring containerization (40%)
   d) Traditional VMs only; not container-ready (0%)

Dimension 3 Score = (Q1+Q2+Q3+Q4+Q5+Q6) / 6
```

---

### Dimension 4: Talent & Capability (7 questions) — Weight: 15%

```
1. Does your organization have in-house data science/ML engineering capability?
   a) Mature team (5+ FTE); mix of seniority (100%)
   b) Solid team (2-4 FTE); mostly mid-level (70%)
   c) 1 FTE or junior-heavy team (40%)
   d) No in-house capability; fully external (0%)

2. How many employees have completed AI/ML training in the past 12 months?
   a) 20%+ of workforce (100%)
   b) 10-20% (70%)
   c) 5-10% (40%)
   d) <5% (0%)

3. Do you have a Chief Data Officer, Chief AI Officer, or equivalent leadership?
   a) Yes, dedicated role; executive sponsor (100%)
   b) Yes, but part-time or recent hire (70%)
   c) Emerging role; not yet formalized (40%)
   d) No such role (0%)

4. How well do business stakeholders understand AI capabilities and limitations?
   a) Strong understanding; realistic expectations (100%)
   b) Good understanding; mostly realistic (70%)
   c) Basic understanding; some misconceptions (40%)
   d) Limited understanding; many misconceptions (0%)

5. What's your annual data scientist/ML engineer turnover rate?
   a) <10% (competitive retention) (100%)
   b) 10-20% (industry average) (70%)
   c) 20-30% (above industry) (40%)
   d) >30% (high churn) (0%)

6. How does your AI talent acquisition pace compare to organizational needs?
   a) Proactive hiring; meeting demand (100%)
   b) Hiring ongoing; meeting 70-80% of demand (70%)
   c) Challenges hiring; 50-70% of positions filled (40%)
   d) Significant hiring gaps; talent unavailable (0%)

7. Do you have structured career development pathways for data science/AI roles?
   a) Yes, clear progression and reskilling programs (100%)
   b) Emerging pathways; inconsistent (70%)
   c) Ad-hoc development (40%)
   d) No structured pathways (0%)

Dimension 4 Score = (Q1+Q2+Q3+Q4+Q5+Q6+Q7) / 7
```

---

### Dimension 5: Governance & Responsible AI (5 questions) — Weight: 10%

```
1. Does your organization have a documented AI governance policy or framework?
   a) Yes, comprehensive; covers development, deployment, monitoring (100%)
   b) Yes, but basic; some gaps (70%)
   c) In development; not yet approved (40%)
   d) No formal governance (0%)

2. Are bias testing and fairness assessments automated for high-risk models?
   a) Yes, all high-risk models tested; automated (100%)
   b) Most high-risk models tested; some automation (70%)
   c) Manual testing only; inconsistent (40%)
   d) No bias testing (0%)

3. Can you explain how your organization's AI models make specific decisions?
   a) Yes, all models documented; explainability standards defined (100%)
   b) Most models explainable; some black-box models exist (70%)
   c) Limited explainability; documentation gaps (40%)
   d) Models not explainable; unclear how they work (0%)

4. Do you have audit trails and documentation for all AI-generated decisions?
   a) Yes, complete audit trails; logged and monitored (100%)
   b) Partially; high-risk decisions logged (70%)
   c) Inconsistent; some documentation gaps (40%)
   d) No audit trails (0%)

5. How prepared is your organization for regulatory compliance in AI (GDPR, CCPA, EU AI Act)?
   a) Mature compliance framework; audit-ready (100%)
   b) Compliance strategy in place; mostly ready (70%)
   c) Emerging compliance efforts; gaps remain (40%)
   d) Minimal compliance preparation (0%)

Dimension 5 Score = (Q1+Q2+Q3+Q4+Q5) / 5
```

---

### Dimension 6: Culture & Change Readiness (5 questions) — Weight: 15%

```
1. How do employees perceive AI in your organization?
   a) Positive; seen as augmentation and opportunity (100%)
   b) Mostly positive; some concerns (70%)
   c) Mixed sentiment; significant skepticism (40%)
   d) Negative; fear and resistance (0%)

2. Do employees believe their jobs are at risk due to AI?
   a) No; leadership messaging clear about reskilling (100%)
   b) Minority concerns; mostly addressed (70%)
   c) Significant concerns; not fully addressed (40%)
   d) Yes; widespread job displacement fears (0%)

3. Do leaders visibly model AI adoption in their own work?
   a) Yes; 75%+ of leaders actively use AI (100%)
   b) Many leaders use AI; visible but not universal (70%)
   c) Some leaders use AI; not widely visible (40%)
   d) Limited visible leader adoption (0%)

4. How would you characterize your organizational culture around innovation?
   a) Strong; failure is acceptable learning (100%)
   b) Good; experimentation encouraged (70%)
   c) Mixed; some innovation; risk-averse in places (40%)
   d) Conservative; risk-averse; limited experimentation (0%)

5. Is there psychological safety for employees to admit knowledge gaps about AI?
   a) Yes; strong psychological safety (100%)
   b) Mostly; some safe spaces (70%)
   c) Limited; some fear of judgment (40%)
   d) Low; fear of judgment common (0%)

Dimension 6 Score = (Q1+Q2+Q3+Q4+Q5) / 5
```

---

## SCORING METHODOLOGY

```
Overall Score = (Leadership & Strategy × 0.20) + 
                (Data Readiness × 0.25) +
                (Tech Infrastructure × 0.15) +
                (Talent & Capability × 0.15) +
                (Governance × 0.10) +
                (Culture & Change × 0.15)

Readiness Levels:
- 0-20: Not Ready (foundational work required)
- 20-40: Early Stage (significant gaps)
- 40-60: Developing (ready with support)
- 60-80: Ready to Accelerate
- 80-100: Advanced (scaling mode)
```

---

## PART 2: SEGMENTED MESSAGING & POSITIONING

### For 40-60 Readiness (Sweet Spot) — FOCUS HERE

**Key Finding:** You have foundations; you need structure and acceleration

**Messaging:**
- "Your readiness score of **52/100** is in the zone where organizations accelerate."
- "Organizations in your position close the gap in 12-18 months and achieve 75%+ AI implementation success."

**Typical Blockers (Customized):**
- Blocker 1: Data governance (score 35/100) — Costing $5-10M annually
- Blocker 2: Change management readiness (score 38/100) — Creating 30-40% adoption resistance
- Blocker 3: Use case clarity (score 40/100) — ROI metrics undefined; pilot purgatory risk

**Recommended Quick Wins (3-4 months):**
1. Select one "champion" department (Finance/Operations) for pilot
2. Deploy high-ROI use case (e.g., invoice automation)
3. Build internal momentum; demonstrate ROI
4. Parallel: Fix highest-impact blocker

**12-Month Acceleration Plan:**
- Months 1-4: Quick win + highest-impact blocker
- Months 4-8: Second use case; scale infrastructure
- Months 8-12: Third use case; organizational scaling
- Target readiness: 70-75 by month 12

**Investment Breakdown:**
- Quick win: $50K-$100K
- Blocker fixes: $150K-$300K
- Scaling: $100K-$200K
- **Total 12-month: $300K-$600K**

**Call to Action:** "Let's identify your specific blockers and design a 12-month acceleration plan. Book a strategy session (2 hours; $10K value, complimentary for qualified organizations)."

---

## PART 3: SALES CONVERSATION STRUCTURE (60 Minutes)

### **Minutes 0-5: Context Setting**
*"Thanks for taking the time. We work with organizations that are looking to move beyond AI pilots to actual business impact. We've found that most organizations have data and technology; they're missing the readmap. Our assessment identifies what's actually blocking you in 2 weeks. Today, I want to understand your situation and see if that would be valuable. Sound good?"*

### **Minutes 5-15: Their Situation**
- "What's your current state with AI? Pilots? In production?"
- "What's working? What's not?"
- "What are you hoping to achieve in the next 12-24 months?"
- "Who else is involved in these decisions?"

### **Minutes 15-30: Understanding Their Gaps**
- "If I had to guess, are you more blocked by data, talent, organizational readiness, or something else?"
- "Have you had any failed initiatives? What happened?"
- "What's the biggest frustration right now?"

### **Minutes 30-40: Positioning**
*"Here's what we're seeing with organizations like yours..."*
- **Share relevant data point** (from most powerful stats below)
- **Position assessment:** "We run a 2-week assessment that identifies your specific blockers, costs to fix, and a clear 12-month roadmap."

### **Minutes 40-50: Building Interest**
- "If we could identify exactly what's blocking you and map a path to unblock it in 12 months, would that be useful?"
- "What would need to be true for this to be a good use of your time and budget?"

### **Minutes 50-60: Next Steps**
- **For 40-60 orgs:** "Let's run a 2-hour strategy workshop where we assess your situation, identify blockers, and map your 12-month plan. It's $10K value; we'll do it complimentary for organizations serious about moving forward."
- **For 0-40 orgs:** "Let's start with a 2-week assessment to understand your foundation."

---

## PART 4: MOST POWERFUL SALES DATA POINTS

Use these liberally in discovery calls:

**General/Opener:**
- "60% of AI projects fail due to organizational readiness gaps, not technology."
- "Organizations scoring 60+ on readiness achieve 75% implementation success vs. 25% for those under 40."

**Data (Blocker #1):**
- "98% of organizations cite data quality as a blocker. On average, it costs $12.9M annually in poor decisions."
- "Most organizations spend 40-60% of analyst time on data cleaning instead of insight generation."

**Talent (Blocker #2):**
- "52% of organizations lack internal AI/ML expertise. Salary premiums are 30-50% above market, and hiring takes 2-4 months."

**Legacy Systems (Blocker #3):**
- "93% cite legacy system integration as a blocker. Fragmented data sources prevent AI from working effectively."

**Change Management (Blocker #4):**
- "46% of employees initially fear AI will replace their jobs. Without addressing this, adoption drops to 20-30%. With psychological safety, it jumps to 75%+."
- "Executives using AI visibly in their own work increases team adoption from 30% to 75%."

**Timeline (Why 12-18 months?):**
- "Organizations attempting 6-month transformation consistently overshoot timeline by 2-3x. Those planning 12-18 months hit them on time."

**ROI (The payoff):**
- "Organizations investing 6-12 months in readiness work achieve 2-3x better ROI and 70% faster time-to-value than those who skip it."
- "Finance automation delivers 40% reduction in close time and 35% cost reduction."

---

## PART 5: EMAIL CLOSING TEMPLATE

After discovery call, send within 24 hours:

---

**Subject:** Next Steps: Your AI Readiness Assessment

**Body:**

Hi [Name],

Great conversation today about your AI challenges. Here's what we discussed:

**Your Situation:**
- [Blocker #1]: [Their pain point]
- [Blocker #2]: [Their pain point]
- [Goal]: [What success looks like]

**What We'd Do:**
Run a 2-hour strategy workshop where we assess your readiness, identify your specific blockers, and map a clear 12-month plan. This usually surfaces 2-3 things you weren't aware of.

**Timeline & Investment:**
- Workshop: 2 hours (Zoom)
- Cost: $10K value; complimentary for qualified organizations
- Outcome: Clear roadmap + next steps

**Next Steps:**
[Calendar link] to schedule. I blocked [dates] — pick whatever works.

**In the meantime:**
I'm sending resources specific to your situation:
- Case study from similar organization
- Research on your specific blocker
- ROI calculator for your use case

Looking forward to working together.

[Your name]

---

## PART 6: SERVICE OFFERINGS SUMMARY

| Service | Duration | Price | Deliverables | When |
|---------|----------|-------|--------------|------|
| **Tier 1: Assessment + Strategy** | 8-12 weeks | $75K-$150K | Readiness report, 18-24 month roadmap, quick wins | 0-40 orgs |
| **Tier 2: Acceleration Program** | 12 months | $300K-$600K | All of Tier 1 + first use case deployment + team building | 40-60 orgs (FOCUS) |
| **Tier 3: Enterprise Scale** | 12-18 months | $600K-$1.2M+ | All of Tier 2 + 5-7 additional use cases + organizational scaling | 60+ orgs |

---

*Ready for sales training, collateral development, and customer engagement.*