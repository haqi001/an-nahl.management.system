interface FormatDateProps {
  date: string;
}

export default function FormatDate({
  date,
}: FormatDateProps) {
  if (!date) {
    return "-";
  }

  const formattedDate =
    new Intl.DateTimeFormat(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ).format(
      new Date(
        `${date}T00:00:00`
      )
    );

  return <span>{formattedDate}</span>;
}