import { useState } from "react";
import styles from "./forms.module.css";
import DifferentButton from "../button/button";

function Form({ fields, submitLabel = "Guardar", onSubmit }) {
    const [values, setValues] = useState(
        Object.fromEntries(fields.map(f => [f.name, ""]))
    );

    const handleChange = (name, value) =>
        setValues(prev => ({ ...prev, [name]: value }));

    const handleReset = () =>
        setValues(Object.fromEntries(fields.map(f => [f.name, ""])));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    const renderInput = (field) => {
        const { name, type, placeholder, options, required } = field;
        const common = {
            value: values[name],
            onChange: e => handleChange(name, e.target.value),
            required,
            placeholder,
        };

        if (type === "select")
            return (
                <select className={styles.select} {...common}>
                    <option value="">Selecciona...</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            );

        if (type === "textarea")
            return <textarea className={styles.textarea} {...common} />;

        return <input className={styles.input} type={type} {...common} />;
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map(field => (
                <div key={field.name} className={styles.field}>
                    <label className={styles.label}>
                        {field.label}
                        {field.required && <span style={{ color: "tomato" }}> *</span>}
                    </label>
                    {renderInput(field)}
                </div>
            ))}

            <div className={styles.actions}>
                <DifferentButton
                    socialName="Limpiar"
                    type="button"
                    onClick={handleReset}
                />
                <DifferentButton
                    socialName={submitLabel}
                    variant="submit"
                    type="submit"
                />
            </div>
        </form>
    );
}

export default Form;