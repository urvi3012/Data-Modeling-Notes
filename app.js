// DATA MODELING
document.getElementById("dataModelingContent").innerHTML = `
<p>Data modeling is how we structure data for analytics.</p>
<ul>
<li>Conceptual → entities</li>
<li>Logical → relationships</li>
<li>Physical → tables</li>
</ul>
`;

// MEDALLION
function activateLayer(layer) {
  const el = document.getElementById("medallionPanel");

  const data = {
    source: `
<h3>Source</h3>
<pre>
order_id | customer_id | amount
1        | 101         | 50
</pre>`,

    bronze: `
<h3>Bronze</h3>
<p>Raw ingestion</p>
<pre>
Same as source + load timestamp
</pre>`,

    silver: `
<h3>Silver</h3>
<p>Cleaned data</p>
<pre>
SELECT DISTINCT customer_id FROM bronze
</pre>`,

    gold: `
<h3>Gold</h3>
<p>Business tables</p>
<pre>
fact_sales(customer_key, revenue)
dim_customer(customer_key, name)
</pre>`,

    report: `
<h3>Analytics</h3>
<p>Total revenue = $50</p>
`
  };

  el.innerHTML = data[layer];
}

// OLTP vs OLAP
function toggleVersus(type) {
  const el = document.getElementById("versusDetail");

  if (type === "oltp") {
    el.innerHTML = `
<h3>OLTP</h3>
<ul>
<li>Writes</li>
<li>Normalized</li>
</ul>`;
  } else {
    el.innerHTML = `
<h3>OLAP</h3>
<ul>
<li>Reads</li>
<li>Analytics</li>
</ul>`;
  }
}

// FACT DIM
function showFDDetail(type) {
  const el = document.getElementById("fdDetail");

  const data = {
    fact: `
<h3>Fact</h3>
<pre>
revenue, quantity
</pre>`,

    dim_customer: `
<h3>Customer</h3>
<pre>
id, name, city
</pre>`,

    dim_product: `
<h3>Product</h3>
<pre>
id, name, category
</pre>`
  };

  el.innerHTML = data[type];
}

// SCD
function showSCD(type) {
  const el = document.getElementById("scdDetail");

  if (type === 1) {
    el.innerHTML = `<pre>Overwrite old value</pre>`;
  }
  if (type === 2) {
    el.innerHTML = `<pre>New row added (history)</pre>`;
  }
  if (type === 3) {
    el.innerHTML = `<pre>Previous column stored</pre>`;
  }
}

// NORMALIZATION
function showNorm(type) {
  const el = document.getElementById("normDisplay");

  const data = {
    raw: `<pre>shoes, shirt in one column</pre>`,
    "1nf": `<pre>separate rows</pre>`,
    "2nf": `<pre>split tables</pre>`,
    "3nf": `<pre>remove dependency</pre>`
  };

  el.innerHTML = data[type];
}
