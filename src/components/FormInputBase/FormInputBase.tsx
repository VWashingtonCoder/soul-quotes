type FormInputBaseProps = {
    id: string,
    label: string,
    type: string,
    value: string,
    change: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function FormInputBase(props: FormInputBaseProps) {
    const { id, label, type, value, change } = props;

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} value={value} onChange={change} />
        </div>
    )
}