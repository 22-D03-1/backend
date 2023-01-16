import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    test: {
        type: String,
        default: "blubb",
    },
});

const Report = mongoose.model("Report", schema);

export const getAll = async () => {
    const reports = await Report.find();
    return reports;
}

export const create = async (title, description, test) => {
    const newReport = new Report({ title, description, test });
    const result = await newReport.save();
    return result;
}

export const remove = async id => {
    return await Report.deleteOne({ _id: id });
}

export default Report;
