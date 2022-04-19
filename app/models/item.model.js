import mongoose from "mongoose";
// Defining Mongoose schema
const schema = mongoose.Schema(
    {
        nameL: {},
        descL: {},
        published: Boolean
    },
    { timestamps: true }
);
// Converting MongoDB object to JSON object and setup id property for front-end instead of _id
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
// Calling the model constructor and exporting link on model
// #5 in diagram
export default mongoose.model("item", schema);