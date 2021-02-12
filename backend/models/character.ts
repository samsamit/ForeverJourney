import mongoose, {Document, model, Model, Schema} from 'mongoose';

export interface MCharacterDocument extends Document, ICharacter{
    password: string;
}

export interface MCharacter extends MCharacterDocument {
  // Methods go here
}

const AttributeSchema = new Schema(
    {
        atk: {type: Number},
        hp: {type: Number}
    }
)

const CharacterSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    race: {
        name: String,
        baseStats: AttributeSchema
    },
    attributes: AttributeSchema,
    owner: {
        type: String,
        required: true,
      }
  },
  { timestamps: true },
);

CharacterSchema.statics.findAllByOwner = async function (owner: string) {return await this.find({owner})};

export interface MCharacterModel extends Model<MCharacter> {
    findAllByOwner(owner: string): MCharacterDocument | null
}

 
const Character: MCharacterModel = model<MCharacter, MCharacterModel>('Character', CharacterSchema);
 
export default Character;