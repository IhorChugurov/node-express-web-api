import mongoose from "mongoose";
const schema = mongoose.Schema(
    {
        nameL: {},
        descL: {},
        published: Boolean
    },
    { timestamps: true }
);
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
export default mongoose.model("item", schema);