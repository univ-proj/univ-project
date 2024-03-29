export default function convert_filter_to_db_query(filters: any[]) {
  const or_filters = [];
  filters.forEach((group_filters) => {
    const and_filters = [];
    group_filters.forEach((single_filter) => {
      let op = '$eq';
      if (single_filter.operator === '>') {
        op = '$gt';
      }
      if (single_filter.operator === '<') {
        op = '$lt';
      }
      if (single_filter.operator === '!=') {
        op = '$ne';
      }
      and_filters.push({
        [single_filter.field_name]: { [op]: single_filter.value },
      });
    });

    if (and_filters.length > 0) {
      or_filters.push({ $and: and_filters });
    }
  });

  if (or_filters.length > 0) {
    return {
      $or: or_filters,
    };
  }

  return {};
}
