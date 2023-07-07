type SelectProps = {
    update: (e: {
        target: {
            value: string
        }
    }) => void;
    value: string;
}

const categories = [
    { key: "all", label: "All Categories" },
    { key: "inspirational", label: "Inspirational" },
    { key: "love", label: "Love/Relationships" },
    { key: "philosophy", label: "Philosophy" },
    { key: "success", label: "Career/Success" },
    { key: "funny", label: "Funny" },

];

export function CategorySelect({ update, value }: SelectProps) {
    return (
        <select onChange={update} value={value}>
            {categories.map((category) => (
                <option key={category.key} value={category.key}>
                    {category.label}
                </option>
            ))}
        </select>
    );
}
