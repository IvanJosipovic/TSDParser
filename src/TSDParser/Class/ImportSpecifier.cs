namespace TSDParser.Class;

public class ImportSpecifier : Node
{
    public Identifier Name { get; set; }

    public Identifier? PropertyName { get; set; }
}
