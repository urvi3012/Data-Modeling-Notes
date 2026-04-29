function showLayer(layer) {
  const info = {
    bronze: `
      <b>Bronze Layer (Raw / Staging)</b><br><br>
      - Exact copy of source system (OLTP)<br>
      - No transformation<br>
      - Used for traceability & debugging<br><br>

      <b>Example:</b><br>
      Source Orders Table → Bronze Orders (same structure)<br>
      order_id | customer_id | amount
    `,

    silver: `
      <b>Silver Layer (Cleaned / Enriched)</b><br><br>
      - Data cleaning (remove nulls, duplicates)<br>
      - Standardization (uppercase, formats)<br>
      - Merge / Upsert logic<br><br>

      <b>Example:</b><br>
      - Remove duplicate orders<br>
      - Standardize customer names<br>
      - Add processed_date column
    `,

    gold: `
      <b>Gold Layer (Business Model)</b><br><br>
      - Data modeled into Fact & Dimension tables<br>
      - Optimized for analytics & dashboards<br><br>

      <b>Example:</b><br>
      fact_sales → revenue, quantity<br>
      dim_customer → customer details
    `
  };

  document.getElementById("layer-info").innerHTML = info[layer];
}

function showSCD(type) {
  const info = {
    1: `
      <b>SCD Type 1 (Overwrite)</b><br><br>
      - No history is stored<br>
      - Old data is replaced<br><br>

      <b>Example:</b><br>
      Customer City: NY → SF<br>
      Old value LOST
    `,

    2: `
      <b>SCD Type 2 (History Tracking)</b><br><br>
      - Keeps full history<br>
      - Uses start_date, end_date, is_current<br><br>

      <b>Example:</b><br>
      Row 1 → NY (expired)<br>
      Row 2 → SF (current)
    `
  };

  document.getElementById("scd-info").innerHTML = info[type];
}

function toggleSchema(type) {
  const info = {
    star: `
      <b>Star Schema</b><br><br>
      - Fact connects directly to dimensions<br>
      - Simple joins<br>
      - High performance<br><br>

      <b>Example:</b><br>
      fact_sales → dim_customer, dim_product
    `,

    snowflake: `
      <b>Snowflake Schema</b><br><br>
      - Dimensions are normalized<br>
      - More joins required<br>
      - Slower queries<br><br>

      <b>Example:</b><br>
      dim_product → dim_category
    `
  };

  document.getElementById("schema-info").innerHTML = info[type];
}
