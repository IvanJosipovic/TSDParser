namespace TSDParser.Class;

public class FunctionType : Node
{
    public Node Type { get; set; }

    public List<Parameter>? Parameters { get; set; }
}
