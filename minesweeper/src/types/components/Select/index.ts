export default interface SelectProps {
    defaultValue?: string,
    values: Record<string, string|number>[],
    selectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
};
