namespace TSDParser.Class;

public class ExportSpecifier : Node
{
    public Identifier Name { get; set; }

    public Identifier PropertyName { get; set; }
}
