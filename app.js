// ===============================
// MEDALLION INTERACTION
// ===============================
const panel = document.getElementById("medallionPanelInner");

function clearActiveNodes() {
  document.querySelectorAll(".pipeline-node").forEach(n => n.classList.remove("active"));
}

function activateLayer(layer) {
  clearActiveNodes();
  document.getElementById(`node-${layer}`).classList.add("active");

  const data = {
    source: `
      <div class="layer-panel">
        <h2>Source (OLTP)</h2>
        <p>Raw transactional system data</p>
        <pre>[
  { id: 1, name: "john", city: "ny" },
  { id: 1, name: "john", city: "ny" }
]</pre>
      </div>
    `,
    bronze: `
      <div class="layer-panel">
        <h2>Bronze Layer</h2>
        <p>No transformation. Just ingestion.</p>
        <pre>Same as source (duplicates allowed)</pre>
      </div>
    `,
    silver: `
      <div class="layer-panel">
        <h2>Silver Layer</h2>
        <p>Clean + Deduplicate + Standardize</p>
        <pre>[
  { id: 1, name: "JOHN", city: "NY" }
]</pre>
      </div>
    `,
    gold: `
      <div class="layer-panel">
        <h2>Gold Layer</h2>
        <p>Business Aggregation</p>
        <pre>[
  { total_customers: 1 }
]</pre>
      </div>
    `,
    report: `
      <div class="gold-report">
        <h2>Analytics Output</h2>
        <div class="bar-chart">
          <div class="bar-row">
            <div class="bar-label">Customers</div>
            <div class="bar-track">
              <div class="bar-fill bar-gold" style="width:70%">1</div>
            </div>
          </div>
        </div>
      </div>
    `
  };

  panel.innerHTML = data[layer];
}

// ===============================
// OLTP vs OLAP
// ===============================
function toggleVersus(type) {
  const el = document.getElementById("versusDetail");

  if (type === "oltp") {
    el.innerHTML = `
      <div class="layer-panel">
        <h2>OLTP</h2>
        <p>Fast writes, normalized data</p>
      </div>`;
  } else {
    el.innerHTML = `
      <div class="layer-panel">
        <h2>OLAP</h2>
        <p>Fast reads, analytical queries</p>
      </div>`;
  }
}

// ===============================
// FACT & DIM
// ===============================
function showFDDetail(type) {
  const el = document.getElementById("fdDetail");

  const data = {
    fact: "<h2>Fact Table</h2><p>Stores metrics like revenue</p>",
    dim_customer: "<h2>Customer Dimension</h2><p>Customer details</p>",
    dim_product: "<h2>Product Dimension</h2><p>Product details</p>",
    dim_date: "<h2>Date Dimension</h2><p>Time context</p>",
    dim_payment: "<h2>Payment Dimension</h2><p>Payment info</p>"
  };

  el.innerHTML = `<div class='layer-panel'>${data[type]}</div>`;
}

// ===============================
// SCHEMA SWITCH
// ===============================
function showSchema(type) {
  const el = document.getElementById("schemaDisplay");

  if (type === "star") {
    el.innerHTML = "<h2>Star Schema</h2><p>Simple joins</p>";
  } else {
    el.innerHTML = "<h2>Snowflake Schema</h2><p>More normalized</p>";
  }

  document.querySelectorAll(".schema-tab").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

// ===============================
// SCD
// ===============================
function showSCD(type) {
  const el = document.getElementById("scdDetail");

  const data = {
    0: "No changes allowed",
    1: "Overwrite old values",
    2: "Add new row with history",
    3: "Keep previous column"
  };

  el.innerHTML = `<div class="scd-content"><h2>SCD Type ${type}</h2><p>${data[type]}</p></div>`;
}

// ===============================
// NORMALIZATION
// ===============================
function showNorm(type) {
  const el = document.getElementById("normDisplay");

  const data = {
    raw: "Messy table with duplicates",
    "1nf": "Atomic columns",
    "2nf": "Remove partial dependency",
    "3nf": "Remove transitive dependency"
  };

  el.innerHTML = `<div><h2>${type.toUpperCase()}</h2><p>${data[type]}</p></div>`;

  document.querySelectorAll(".norm-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

// ===============================
// MODAL
// ===============================
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}
