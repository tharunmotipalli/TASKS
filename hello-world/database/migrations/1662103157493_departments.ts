import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'departments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('depid')
      table.string('depname')
      table.string('empname')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
