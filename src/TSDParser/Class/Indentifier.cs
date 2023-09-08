using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class Identifier : Node
{
    public string EscapedText { get; set; }
}
