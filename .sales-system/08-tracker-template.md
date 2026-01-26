# Outreach Tracker Template

## Instructions
1. Copy this to Google Sheets
2. Use filters to view today's tasks
3. Update daily as you send messages and get responses

---

## Column Headers

| Name | Company | Title | Email | LinkedIn URL | Tier | Source | Outreach Date | Template Used | Channel | Response? | Response Date | Next Follow-Up | Status | Notes |
|------|---------|-------|-------|--------------|------|--------|---------------|---------------|---------|-----------|---------------|----------------|--------|-------|
| | | | | | | | | | | | | | | |

---

## How to Use

### Tier Values
- `1-Hot` = Warm relationship, decision-maker, high priority
- `2-Warm` = LinkedIn connection, subscriber, moderate priority
- `3-Cold` = No prior relationship, volume play
- `4-Ignore` = Not a fit (wrong role, company, etc.)

### Source Values
- `TwentyCRM`
- `ReFi DAO`
- `LinkedIn`
- `Pikl`
- `Regenera`
- `Substack`
- `Optimize Media`
- `Referral`

### Template Values
- `Warm-LinkedIn`
- `Warm-Email`
- `Cold-Email`
- `Referral`
- `Event`
- `Day2-FollowUp`
- `Day5-FollowUp`
- `Day10-FollowUp`
- `Breakup`

### Channel Values
- `LinkedIn DM`
- `Email`

### Response Values
- `Yes` = They replied
- `No` = No response yet
- (Leave blank if not sent yet)

### Status Values
- `Cold - No Response` = Outreach sent, waiting
- `Active - Sent Assessment` = Assessment link sent
- `Active - Call Scheduled` = Call booked
- `Active - In Discovery` = Currently on sales call
- `Opportunity - Proposal Sent` = Proposal delivered
- `Nurture - Follow Up [Date]` = Bad timing, revisit later
- `Closed - Won` = Deal closed!
- `Closed - Not Interested` = Explicit "no"
- `Closed - Not a Fit` = Wrong ICP

---

## Example Rows

| Name | Company | Title | Email | LinkedIn URL | Tier | Source | Outreach Date | Template Used | Channel | Response? | Response Date | Next Follow-Up | Status | Notes |
|------|---------|-------|-------|--------------|------|--------|---------------|---------------|---------|-----------|---------------|----------------|--------|-------|
| Jane Smith | Acme Corp | CEO | jane@acme.com | linkedin.com/in/janesmith | 1-Hot | Pikl | 2026-01-27 | Warm-LinkedIn | LinkedIn DM | Yes | 2026-01-28 | - | Active - Call Scheduled | Call on 2/3 at 2pm |
| Bob Johnson | TechCo | VP Ops | bob@techco.io | linkedin.com/in/bobjohnson | 2-Warm | LinkedIn | 2026-01-27 | Warm-Email | Email | No | - | 2026-01-29 | Cold - No Response | Day 2 follow-up due |
| Sarah Lee | StartupXYZ | COO | sarah@startupxyz.com | linkedin.com/in/sarahlee | 3-Cold | ReFi DAO | 2026-01-27 | Cold-Email | Email | No | - | 2026-01-29 | Cold - No Response | - |

---

## Daily Workflow

### Morning (Before Outreach)
1. Filter by: `Status = "Cold - No Response"` AND `Next Follow-Up = TODAY`
2. Send Day 2, Day 5, or Day 10 follow-ups
3. Update `Outreach Date` and `Template Used`

### After Morning Outreach Block
1. Add 10 new rows (today's contacts)
2. Fill in: Name, Company, Title, Email, LinkedIn, Tier, Source
3. After sending: Fill in Outreach Date, Template, Channel
4. Set `Next Follow-Up` = Today + 2 days
5. Set `Status` = "Cold - No Response"

### After Afternoon Outreach Block
1. Add 10 new rows
2. Repeat above steps

### Evening (Response Management)
1. Filter by: `Response? = "Yes"`
2. For each response:
   - Update `Response Date`
   - Update `Status` (Active - Call Scheduled, Sent Assessment, etc.)
   - Add notes

3. Update `Next Follow-Up` for tomorrow's tasks

---

## Quick Filters for Daily Use

### "Today's Outreach" (Morning Hit List)
- Filter: `Tier = 1-Hot` OR `Tier = 2-Warm`
- Filter: `Status = ""` (blank = not contacted yet)
- Sort by: `Tier` (ascending, so 1-Hot shows first)

### "Today's Follow-Ups"
- Filter: `Next Follow-Up = TODAY`
- Filter: `Status = "Cold - No Response"`

### "Active Opportunities"
- Filter: `Status CONTAINS "Active"` OR `Status CONTAINS "Opportunity"`

### "This Week's Metrics"
- Filter: `Outreach Date >= [Monday of this week]`
- Count rows for total outreach sent

---

## Weekly Metrics Dashboard

### Add these formulas at the bottom of your sheet:

**Total Outreach This Week:**  
`=COUNTIF(H:H, ">="&[Monday Date])`

**Total Responses This Week:**  
`=COUNTIF(K:K, "Yes")`

**Response Rate:**  
`=Total Responses / Total Outreach`

**Calls Booked This Week:**  
`=COUNTIF(N:N, "Active - Call Scheduled")`

**Proposals Sent This Week:**  
`=COUNTIF(N:N, "Opportunity - Proposal Sent")`

**Deals Closed This Week:**  
`=COUNTIF(N:N, "Closed - Won")`

---

## Color Coding (Conditional Formatting)

### Tier
- `1-Hot` = Green background
- `2-Warm` = Yellow background
- `3-Cold` = Orange background
- `4-Ignore` = Red background

### Status
- `Active - *` = Light blue background
- `Opportunity - *` = Blue background
- `Closed - Won` = Dark green background
- `Closed - Not Interested` = Gray background

### Next Follow-Up
- If `Next Follow-Up = TODAY` → Red text, bold

---

## Sample Google Sheets Setup

1. Create new Google Sheet
2. Name it "AI Transformation Outreach Tracker"
3. Add tabs:
   - `Main Tracker` (this template)
   - `Tier 1 Contacts` (your 50-100 hot leads)
   - `Tier 2 Contacts` (your warm leads)
   - `Weekly Metrics` (dashboard with charts)

4. Set up filters and color coding
5. Share with accountability partner (optional)

---

## Integration with TwentyCRM

**Option 1: Manual Sync**
- Log outreach in both places
- Use this sheet for daily workflow
- Use TwentyCRM for full contact records

**Option 2: Export Weekly**
- Export this week's new contacts to TwentyCRM
- Keep this sheet as daily operational tool
- Use TwentyCRM as source of truth

**Option 3: TwentyCRM Only**
- Skip this sheet entirely
- Use TwentyCRM's tasks/reminders for follow-ups
- Use TwentyCRM's reports for metrics

---

**End of Tracker Template**
