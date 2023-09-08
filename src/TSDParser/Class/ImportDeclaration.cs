namespace TSDParser.Class;

public class ImportDeclaration : Node
{
    public ImportClause ImportClause { get; set; }

    public StringLiteral ModuleSpecifier { get; set; }
}
