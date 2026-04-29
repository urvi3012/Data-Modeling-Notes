function showLayer(layer) {
  const info = {
    bronze: `
      <b>Bronze Layer (Raw / Staging)</b><br><br>
      - Exact copy of source (OLTP)<br>
      - No transformations<br>
      - Used for debugging<br><br>

      <b>Example:</b><br>
      Raw Orders table loaded as-is
    `,

    silver: `
      <b>Silver Layer (Cleaned / Enriched)</b><br><br>
      - Remove duplicates<br>
      - Clean nulls<br>
      - Standardize formats<br><br>

      <b>Example:</b><br>
      Cleaned Orders table with unique records
    `,

    gold: `
      <b>Gold Layer (Analytics)</b><br><br>
      - Fact & Dimension tables<br>
      - Optimized for BI<br><br>

      <b>Example:</b><br>
      fact_sales + dim_customer
    `
  };

  document.getElementById("layer-info").innerHTML = info[layer];
}

function showSCD(type) {
  const info = {
    1: `
      <b>SCD Type 1</b><br><br>
      - Overwrites old data<br>
      - No history<br><br>

      Example:<br>
      NY → SF (NY lost)
    `,

    2: `
      <b>SCD Type 2</b><br><br>
      - Keeps history<br>
      - Uses start_date, end_date<br><br>

      Example:<br>
      Row 1 → NY (old)<br>
      Row 2 → SF (current)
    `
  };

  document.getElementById("scd-info").innerHTML = info[type];
}

function toggleSchema(type) {
  const info = {
    star: `
      <b>Star Schema</b><br><br>
      - Simple structure<br>
      - Fast queries<br><br>

      fact_sales → dim_customer, dim_product
    `,

    snowflake: `
      <b>Snowflake Schema</b><br><br>
      - Normalized dimensions<br>
      - More joins<br><br>

      dim_product → dim_category
    `
  };

  document.getElementById("schema-info").innerHTML = info[type];
}
