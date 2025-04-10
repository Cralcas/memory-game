type CategoryOption = { name: string; value: string };
type NumberOption = { value: string };

interface OptionProps {
  valueArray: CategoryOption[] | NumberOption[];
}

export default function Option({ valueArray }: OptionProps) {
  const optionEl = valueArray.map((item) => {
    return (
      <option key={item.value} value={item.value}>
        {"name" in item ? item.name : item.value}
      </option>
    );
  });

  return optionEl;
}
