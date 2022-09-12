import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('age')
      table.string('gender')
      table.string('email')
      table.string('mobile')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
