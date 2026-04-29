function showLayer(layer) {
  const info = {
    bronze: `
      <b>Bronze Layer (Raw / Staging)</b><br>
      - Exact copy of source data<br>
      - No transformations<br><br>
      <b>Example:</b><br>
      Raw Orders table loaded as-is
    `,
    silver: `
      <b>Silver Layer (Cleaned / Enriched)</b><br>
      - Data cleaned & standardized<br>
      - Remove duplicates<br><br>
      <b>Example:</b><br>
      Uppercase names, remove nulls
    `,
    gold: `
      <b>Gold Layer (Analytics / BI)</b><br>
      - Fact & Dimension tables<br>
      - Ready for dashboards<br><br>
      <b>Example:</b><br>
      fact_sales + dim_customer
    `
  };

  document.getElementById("layer-info").innerHTML = info[layer];
}

function showSCD(type) {
  const info = {
    1: `
      <b>SCD Type 1 (Overwrite)</b><br>
      - No history<br><br>
      Old: Category = Electronics<br>
      New: Category = Gadgets
    `,
    2: `
      <b>SCD Type 2 (History)</b><br>
      - Keeps historical records<br><br>
      Columns:<br>
      start_date, end_date, is_current
    `
  };

  document.getElementById("scd-info").innerHTML = info[type];
}

function toggleSchema(type) {
  const info = {
    star: `
      <b>Star Schema</b><br>
      - Fact connects directly to dimensions<br>
      - Fast & simple
    `,
    snowflake: `
      <b>Snowflake Schema</b><br>
      - Dimensions normalized further<br>
      - More joins, slower queries
    `
  };

  document.getElementById("schema-info").innerHTML = info[type];
}
