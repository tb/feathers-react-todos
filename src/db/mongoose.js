import mongoose from 'mongoose';
// import deepPopulate from 'mongoose-deep-populate';

mongoose.createConnection('mongodb://localhost/awesome-project');
// mongoose.set('debug', true);

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

export default mongoose;

export const Schema = mongoose.Schema;

export const addVirtualId = schema => {
  schema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  schema.set('toJSON', {virtuals: true});
  schema.set('toObject', {virtuals: true});
};
