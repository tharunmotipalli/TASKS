import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('empid')
      .unsigned()
      .references('tabs.id')
      .onDelete('cascade')
      table.string('empbranch')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
