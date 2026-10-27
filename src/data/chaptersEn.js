export const chaptersEn = [
  {
    id: 'quickstart',
    number: '01',
    title: 'Introduction & PWA Quick Start',
    shortTitle: 'Quick Start & Offline',
    icon: 'Zap',
    badge: 'Basics',
    summary: 'Zero-Reception philosophy, installing the PWA without an app store, and granting device permissions.',
    content: `
### 1.1 The "Zero-Reception Ready" Philosophy
Standard construction apps fail on site because they depend on an active 4G/5G connection. On real job sites, supervisors and tradies work in:
- **Deep basement excavations** shielded by reinforced concrete.
- **Lift cores and service shafts** where cellular signals drop to zero.
- **Remote regional projects** outside dependable carrier coverage.

**How PROLOG Solves Site Disconnection:**
- Data is written immediately to your device's encrypted browser storage (**IndexedDB / Dexie**).
- Photos, GPS geostamps, diary logs, and sign-off signatures **remain 100% intact** even in Airplane Mode.
- When you walk back to the site office with Wi-Fi or regain cellular reception, PROLOG executes an automatic **Background Sync** to the cloud database (**Supabase**).

---

### 1.2 Installation Guide (PWA - Add to Home Screen)
PROLOG is built as a **Progressive Web App (PWA)**. There are no app store approval delays or bulky downloads filling up your device memory.

#### 📱 Android Users (Google Chrome):
1. Open Chrome and navigate to \`https://global.prolog.web.id\`.
2. Tap the **Three Dots menu (⋮)** in the top right corner.
3. Select **"Add to Home screen"** or **"Install App"**.
4. The PROLOG icon will appear on your home screen ready for instant offline access.

#### 🍏 iOS / iPad Users (Safari):
1. Open Safari and navigate to \`https://global.prolog.web.id\`.
2. Tap the **Share icon (box with upward arrow)** at the bottom bar.
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add** in the top right corner.

> [!IMPORTANT]
> **Mandatory Device Permissions:**
> - **Camera**: Grant permission on first launch for taking site progress photos.
> - **Location (GPS)**: Select *"While Using the App"* so PROLOG can automatically burn latitude, longitude, and site suburb stamps directly onto your photo watermarks.
`
  },
  {
    id: 'roles',
    number: '02',
    title: 'Workspace Architecture & Role Permissions',
    shortTitle: 'Workspace & Site Roles',
    icon: 'Shield',
    badge: 'Security',
    summary: 'Company tenant codes, 4-digit site security PINs, and role-based access control matrix.',
    content: `
### 2.1 Multi-Tenant Organization Structure
PROLOG isolates each builder and subcontractor company into private enterprise workspaces:
1. **Company Code (Tenant)**: Unique alphanumeric identifier (e.g., \`BUILDER1\`, \`PROLOG\`, \`MULTIPLEX\`).
2. **Security PIN Access**: Fast 4-digit PIN authentication designed for quick site login without typing complex passwords on dirty screens under bright glare.

---

### 2.2 Site Role Matrix (*Role-Based Access Control*)

| Role | Core Responsibility | Site Diary Access | Defect / Punchlist Access | PTW & Trade Handover Access |
| :--- | :--- | :--- | :--- | :--- |
| **Principal Builder / PM (Super Admin)** | Overall site compliance, contract milestones, commercial sign-offs. | Full approval, sign-off validation, and **exclusive authority to delete records**. | Assign subbies, approve rectifications, close defects. | Authorize high-risk PTW permits and execute trade handover certificates. |
| **Site Supervisor / Site Engineer** | Daily technical coordination and field quality enforcement. | Create drafts, update trade headcounts, snap watermarked progress photos. | Raise punchlist items, drop floorplan pins, verify subcontractor rectifications. | Submit PTW applications and inspect trade handovers before sign-off. |
| **Quality Control (QC) / Consultant** | Independent verification against Australian building standards. | Review technical descriptions and compliance attachments. | Audit defects, inspect Before-After sliders, sign off hold points. | Verify quality completion checklist before trade handovers. |
| **Subcontractor (*Subbies*) / Tradies** | Trade package delivery (Framing, Plastering, Electrical, Plumbing). | View daily allocated tasks and manpower records. | View assigned defect pins, submit "After" rectification photos. | Sign trade acceptance and area protection acknowledgments. |
`
  },
  {
    id: 'diary',
    number: '03',
    title: 'Daily Site Diary & Progress Logs',
    shortTitle: 'Daily Site Diary',
    icon: 'FileText',
    badge: 'Operations',
    summary: 'Site diary lifecycle from Draft to PM Approval, trade headcounts, and work item documentation.',
    content: `
### 3.1 The Site Diary Lifecycle
Your daily site diary is a critical legal and commercial record under Australian standard construction contracts.

1. **DRAFT (Site Supervisor)**:
   - Supervisor logs daily trade headcounts (framers, sparkies, plumbers, tilers).
   - Records work items by floor/zone with attached watermarked photos.
   - Status: \`⏳ DRAFT\`. Remains fully editable throughout the shift.
2. **VALIDATION & REVIEW (Project Manager)**:
   - PM inspects diary entries via the PDF Compiler panel -> taps \`👁️ Review\`.
   - Verifies work done against contract schedules and milestones.
3. **APPROVED & LOCKED (Legal Record)**:
   - PM executes digital sign-off directly on the device touchscreen.
   - Diary is stamped \`✅ APPROVED\` and permanently locked against retroactive tampering.

---

### 3.2 Step-by-Step Shift Logging:
1. Tap \`+ New Daily Log\` on the home dashboard.
2. **Weather Condition**: Select primary weather (Fine, Overcast, Showers, Heavy Rain).
3. **Trade Headcount**: Enter trade numbers by package (e.g., 6 Carpenters, 2 Electricians, 4 Plasterers).
4. **Activity Description**: Tap \`+ Add Work Item\`, select level/room, describe progress, and capture photos using the Smart Construction Camera.
5. Tap \`Save Site Diary\`. Your record is instantly secured in local offline memory!
`
  },
  {
    id: 'camera',
    number: '04',
    title: 'Smart Construction Camera & GPS Watermarking',
    shortTitle: 'Smart Camera & Watermark',
    icon: 'Camera',
    badge: 'Camera',
    summary: 'Smart Landscape Auto-Rotate, anti-sideways rectification, and tamper-evident geostamps.',
    content: `
### 4.1 Why 16:9 Landscape is the Site Standard
Construction documentation requires wide-angle context. 100% of PDF export templates in PROLOG are engineered for **16:9 Landscape** photographs so structural spans and room dimensions are clearly visible.

### 4.2 The Smart Landscape Auto-Rotate Breakthrough:
Many supervisors lock their phone's "Auto-Rotate" quick setting so their screen doesn't flip unexpectedly. Standard browser cameras get forced into portrait, producing sideways or upside-down 90-degree images when tilted.

**How PROLOG Rectifies Orientation Automatically:**
- **Raw Sensor Tracking**: PROLOG reads physical device tilt via accelerometer and gyroscope hardware (\`gamma\` and \`beta\`).
- **Canvas Transformation Matrix**: When the phone is turned horizontally to the left or right, PROLOG dynamically rotates the sensor stream by $90^\\circ$ or $-90^\\circ$ on the canvas. The captured photo is an authentic, full-resolution 16:9 landscape image that is **always right-side up**.
- **Interactive Mode Pill**: Tap the top badge \`[ 📐 Landscape (Wide) ⇋ ]\` to switch to \`[ 📱 Portrait ]\` if you specifically need vertical shots (e.g., full-height columns or multi-story facades).
- **Framing Guides**: When holding the phone upright in landscape mode, subtle letterbox guidelines show the exact 16:9 capture boundary.

---

### 4.3 Tamper-Evident Geostamp Bar:
Every photo captured automatically receives an immutable black watermark bar along the bottom:
1. **Branding & Project**: \`🔍 PROLOG | [Active Project Name]\`
2. **GPS Geolocation**: Precise latitude, longitude, and site suburb lookup.
3. **Time & Weather**: Accurate local timestamp down to the second, plus weather status.
`
  },
  {
    id: 'defects',
    number: '05',
    title: 'Defect Management (Floorplan Pins & Punchlists)',
    shortTitle: 'Defects & Floorplan Pins',
    icon: 'MapPin',
    badge: 'Quality (QC)',
    summary: 'Interactive floorplan drop pins, Before-After rectification slider, and subbie audit trails.',
    content: `
### 5.1 Eliminating "Which Wall Was It?" Disputes
PROLOG eliminates confusion between builders and subcontractors through interactive visual floorplan plotting.

#### Punchlist Workflow:
1. **Identify Defect**: Open Defects tab -> tap \`+ Log New Defect\`.
2. **Capture "Before" Photo**: Snap the defective item (e.g., chipped stone benchtop, misaligned architrave).
3. **Drop Pin on Floorplan**:
   - Select the relevant level floorplan (e.g., *Level 2 Architectural Plan*).
   - Tap the exact spot on the drawing where the defect is located. A numbered red pin drops onto precise X,Y coordinates.
4. **Assign Subbie**: Select responsible trade contractor and set priority (*Low*, *Medium*, *Critical*).
5. **Rectification & "After" Photo**:
   - Subcontractor completes the repair and uploads an "After" photo.
6. **Before-After Comparison Slider**:
   - Supervisors and clients drag the interactive slider across the image to verify exact alignment and finish quality.
   - Once verified, status is marked \`CLOSED\`.
`
  },
  {
    id: 'signoff',
    number: '06',
    title: 'Permit to Work (PTW) & Trade Handover Sign-Offs',
    shortTitle: 'PTW & Trade Handover',
    icon: 'ClipboardCheck',
    badge: 'Compliance',
    summary: 'Permit to Work across 4 trade disciplines, shopdrawing camera integration, and area protection sign-offs.',
    content: `
### 6.1 Permit to Work (PTW / SIKA)
High-risk work packages require authorized permits before commencement on Australian and international sites:
- **Structural & Concrete**: Reinforcement, formwork, elevated pours, heavy shoring.
- **Finishing & Architectural**: Plasterboard ceilings, masonry, joinery, waterproofing.
- **Services & MEP**: Electrical mains, rough-ins, drainage stacks, HVAC ducting.
- **Exterior & Civil**: Earthworks, boundary retention, external cladding, civil works.

#### PROLOG PTW Capabilities:
- **Quick Scope Selector**: Instant scope chips matching standard trade packages.
- **Direct Shopdrawing Attachment**: Compact camera button beside the drawing number field to snap approved site plans.
- **Safety & SWMS Checklists**: Mandatory confirmation of PPE (Hard hat, Hi-vis, Steel-cap boots, Fall arrest harness).
- **Dual Sign-Off**: Digital touchscreen authorization between Trade Applicant and Site Supervisor.

---

### 6.2 Trade Handover & Area Protection
**Eliminating Back-Charging Claims:**
A common Australian site dispute occurs when plasterers deliver flawless wall finishes, only to have them scratched or damaged a week later by services tradies installing cabling or piping.

**How PROLOG Protects Builders:**
1. Formally certifies that a trade package has completed 100% of its scope and passed quality sign-off.
2. **Area Protection Guarantee**: The incoming trade formally acknowledges receiving the area in pristine condition and accepts responsibility to protect finished surfaces.
3. Executed with digital signatures between Outgoing Trade, Incoming Trade, and Principal Builder.
`
  },
  {
    id: 'pdf',
    number: '07',
    title: 'PDF Compilations, History Filtering & Exports',
    shortTitle: 'PDF Compilations & Filter',
    icon: 'Download',
    badge: 'Reporting',
    summary: 'Date range and author filters, QR-validated PDF compilations, and restricted deletion governance.',
    content: `
### 7.1 Intelligent History & Date Range Filtering
On projects spanning months with hundreds of diary entries, supervisors should never waste time scrolling endlessly:
- **Date Range Filter**: Select Start Date and End Date (e.g., filter diaries for the first half of October).
- **Author Filter**: Filter by specific supervisor or engineer to audit individual team shift logs.
- **Streamlined Dashboard**: Displays the 7 most recent site logs with author badges (\`👤 Author Name\`).

---

### 7.2 Professional Client-Ready PDF Exports
When tapping \`Sign Off\` or \`Export PDF\`:
1. **Executive Builder Header**: Company branding, project address, and issuance timestamp.
2. **Aggregated Manpower Table**: Total cumulative hours and trade headcounts.
3. **16:9 Landscape Gallery Grid**: Watermarked progress photos laid out in dual-column format with captions.
4. **Three-Way Sign-Off Block**: Digital signatures for Supervisor, Quality Auditor, and Principal Builder with QR verification.

> [!CAUTION]
> **Audit Governance & Record Protection:**
> To guarantee regulatory audit integrity, diary deletion (\`Delete Log\`) **is strictly restricted to Super Admin / Principal Builder roles**. Site supervisors cannot delete historical logs once created.
`
  },
  {
    id: 'faq',
    number: '08',
    title: 'Site Best Practices & Troubleshooting (FAQ)',
    shortTitle: 'Best Practices & FAQ',
    icon: 'HelpCircle',
    badge: 'Support',
    summary: 'Preventing backlight glare, recovery from phone power loss, and managing non-tech subbies.',
    content: `
### 💡 Field Best Practices:
1. **Avoid Backlight Glare**: Keep the sun or high-bay halogen lights behind your back so structural elements stay sharp and well-exposed.
2. **Hold Phone in Landscape**: Position your device horizontally to capture complete room spans and elevations in a single frame.
3. **End-of-Shift Cloud Sync**: When returning to the site office, connect to Wi-Fi and verify the green status indicator (\`🟢 Online / All Synced\`).

---

### ❓ Frequently Asked Questions (FAQ):

**Q1: What happens if my phone battery dies in the middle of an inspection?**
> **Answer:** You will not lose your work. PROLOG saves drafts locally in browser cache on every keystroke. Simply plug in your device, reopen the app, and your work will be right where you left it.

**Q2: Why doesn't the GPS address populate when I'm inside a concrete basement?**
> **Answer:** Satellite GPS signals cannot penetrate thick concrete slabs. PROLOG will gracefully fall back to your last known accurate coordinate or use the project site's registered address.

**Q3: Can subbies without modern smartphones sign off on permits?**
> **Answer:** Yes. Subcontractors do not need to install anything on their personal devices. Site supervisors can open the PTW or Trade Handover form on their own phone, and the subbie signs directly on the supervisor's touchscreen.

**Q4: Do high-resolution photos fill up my supervisor's phone storage?**
> **Answer:** No. PROLOG features automatic client-side compression. Photos are scaled to an optimal engineering resolution before saving, keeping device storage free while maintaining crisp visual clarity.
`
  }
];
