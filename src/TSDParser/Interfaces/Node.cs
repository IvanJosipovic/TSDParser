using TSDParser.Enums;

namespace TSDParser.Interfaces
{
    public interface Node
    {
        SyntaxKind Kind { get; }
    }
}
