namespace TSDParser.Class;

public class ConstructorType : Node
{
    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }
}
