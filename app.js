// ===============================
// DATA MODELING (LOAD ON START)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("dataModelingContent");
  if (el) {
    el.innerHTML = `
    <div class="layer-panel">
      <h2>Data Modeling</h2>

      <p>
        Data modeling defines how data is structured, stored, and queried efficiently.
      </p>

      <h3>3 Layers</h3>
      <ul class="layer-bullets">
        <li><b>Conceptual:</b> Business entities (Customer, Orders)</li>
        <li><b>Logical:</b> Relationships + keys</li>
        <li><b>Physical:</b> Tables, indexes, partitions</li>
      </ul>

      <h3>Goal</h3>
      <ul class="layer-bullets">
        <li>Fast analytics</li>
        <li>Scalable pipelines</li>
        <li>Clean structure</li>
      </ul>
    </div>`;
  }
});

// ===============================
// MEDALLION
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

      <pre>
order_id | customer_id | product_id | amount
1        | 101         | 9001       | 50
1        | 101         | 9001       | 50
      </pre>

      <p>Raw transactional data (normalized, write-heavy)</p>
    </div>
    `,

    bronze: `
    <div class="layer-panel">
      <h2>Bronze Layer</h2>

      <pre>
order_id | customer_id | product_id | amount | load_ts
1        | 101         | 9001       | 50     | 2025
1        | 101         | 9001       | 50     | 2025
      </pre>

      <p>No transformation. Just ingestion.</p>
    </div>
    `,

    silver: `
    <div class="layer-panel">
      <h2>Silver Layer</h2>

      <h3>Transformation</h3>
      <pre>
SELECT DISTINCT customer_id, product_id, amount
FROM bronze_orders
      </pre>

      <h3>Output</h3>
      <pre>
customer_id | product_id | amount
101         | 9001       | 50
      </pre>
    </div>
    `,

    gold: `
    <div class="layer-panel">
      <h2>Gold Layer</h2>

      <h3>Fact Table</h3>
      <pre>
fact_sales
sale_id
customer_key
product_key
revenue
      </pre>

      <h3>Dimensions</h3>
      <pre>
dim_customer(customer_key, name, city)
dim_product(product_key, category)
      </pre>
    </div>
    `,

    report: `
    <div class="gold-report">
      <h2>Analytics Output</h2>

      <div class="bar-chart">
        <div class="bar-row">
          <div class="bar-label">Customer 101</div>
          <div class="bar-track">
            <div class="bar-fill bar-gold" style="width:80%">$50</div>
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

      <ul class="layer-bullets">
        <li>Write-heavy</li>
        <li>Normalized (3NF)</li>
        <li>Real-time</li>
      </ul>

      <pre>
orders(order_id, customer_id, product_id)
customers(customer_id, name)
      </pre>
    </div>`;
  } else {
    el.innerHTML = `
    <div class="layer-panel">
      <h2>OLAP</h2>

      <ul class="layer-bullets">
        <li>Read-heavy</li>
        <li>Denormalized</li>
        <li>Analytics queries</li>
      </ul>

      <pre>
SELECT SUM(revenue)
FROM fact_sales
GROUP BY product
      </pre>
    </div>`;
  }
}

// ===============================
// FACT & DIM
// ===============================
function showFDDetail(type) {
  const el = document.getElementById("fdDetail");

  const data = {

    fact: `
    <h2>fact_sales</h2>
    <pre>
sale_id
customer_key
product_key
date_key
quantity
revenue
    </pre>
    `,

    dim_customer: `
    <h2>dim_customer</h2>
    <pre>
customer_key
customer_id
name
email
city
    </pre>
    `,

    dim_product: `
    <h2>dim_product</h2>
    <pre>
product_key
product_name
category
brand
    </pre>
    `,

    dim_date: `
    <h2>dim_date</h2>
    <pre>
date_key
date
month
year
    </pre>
    `,

    dim_payment: `
    <h2>dim_payment</h2>
    <pre>
payment_key
payment_type
provider
currency
    </pre>
    `
  };

  el.innerHTML = `<div class="layer-panel">${data[type]}</div>`;
}

// ===============================
// SCHEMA
// ===============================
function showSchema(type) {
  const el = document.getElementById("schemaDisplay");

  if (type === "star") {
    el.innerHTML = "<h2>Star Schema</h2><p>Direct joins (fast)</p>";
  } else {
    el.innerHTML = "<h2>Snowflake</h2><p>More joins (complex)</p>";
  }

  document.querySelectorAll(".schema-tab").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

// ===============================
// SCD
// ===============================
function showSCD(type) {
  const el = document.getElementById("scdDetail");

  const data = {

    1: `
    <h2>SCD Type 1</h2>
    <pre>
Before: john@old
After:  john@new
    </pre>
    <p>History lost</p>
    `,

    2: `
    <h2>SCD Type 2</h2>
    <pre>
1001 | old | 2023 | 2024 | N
1001 | new | 2024 | NULL | Y
    </pre>
    <p>History preserved</p>
    `,

    3: `
    <h2>SCD Type 3</h2>
    <pre>
email | previous_email
new   | old
    </pre>
    `,

    0: `
    <h2>SCD Type 0</h2>
    <p>No change allowed</p>
    `
  };

  el.innerHTML = `<div class="scd-content">${data[type]}</div>`;
}

// ===============================
// NORMALIZATION
// ===============================
function showNorm(type) {
  const el = document.getElementById("normDisplay");

  const data = {
    raw: `
      <pre>
order_id | products
1        | shoes, shirt
      </pre>
    `,
    "1nf": `
      <pre>
order_id | product
1        | shoes
1        | shirt
      </pre>
    `,
    "2nf": `
      <pre>
orders(order_id, customer_id)
products(product_id, name)
      </pre>
    `,
    "3nf": `
      <pre>
customers(customer_id, city_id)
cities(city_id, city)
      </pre>
    `
  };

  el.innerHTML = `<div>${data[type]}</div>`;

  document.querySelectorAll(".norm-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

// ===============================
// MODAL
// ===============================
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}
