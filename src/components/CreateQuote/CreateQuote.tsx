import { CategorySelect } from "../CategorySelect/CategorySelect";

export default function CreateQuote() {

    return (
        <section className="page create">
            <h2 className="page-title">Create Your Own Quote</h2>

            <form id="createForm">
                <div className="form-input-container flex-align-center">
                    <label className="input-label">Quote*: </label>
                    <textarea 
                        className="form-input quote" 
                        name="quote"
                        cols={50} 
                        rows={4} 
                        placeholder="To Make Or Not Make A Quote...That Is The Question."
                        required 
                    />
                </div>

                <div className="form-input-container">
                    <label className="input-label">Author*: </label>
                    <input className="form-input author" name="author" type="text" required />
                </div>

                <div className="form-input-container">
                    <label className="input-label">Category*: </label>
                    <CategorySelect />
                </div>

                <input className="submit-btn" type="submit" />
                
            </form>
        </section>
    )
}