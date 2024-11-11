import React from 'react'

const DocumentDetails = () => {
    return (
        <div className="col-span-1 md:col-span-2 bg-white p-4 shadow rounded-lg space-y-4">
            <div>
                <label className="block font-bold mb-1">Section</label>
                <input type="text" className="input input-bordered w-full" value="4.1 Context of the Organization" readOnly />
            </div>
            <div>
                <label className="block font-bold mb-1">Nature of Change</label>
                <input type="text" className="input input-bordered w-full" value="Insertions Deletions Modifications" readOnly />
            </div>
            <div>
                <label className="block font-bold mb-1">Original Text</label>
                <textarea className="textarea textarea-bordered w-full" placeholder="Preview of text..." readOnly></textarea>
            </div>
            <div>
                <label className="block font-bold mb-1">Redlined Text</label>
                <textarea className="textarea textarea-bordered w-full" placeholder="Preview of text..." readOnly></textarea>
            </div>
            <div>
                <label className="block font-bold mb-1">Favorable</label>
                <textarea className="textarea textarea-bordered w-full" placeholder="Justification" readOnly></textarea>
            </div>
            <div className="flex justify-between">
                <button className="btn btn-outline">Previous</button>
                <button className="btn btn-primary">Next</button>
            </div>
        </div>
    )
}

export default DocumentDetails