#include <fstream>
#include <iostream>
#include <string>
using namespace std;
 
int main() {
    ifstream data ("1project.txt");
    if (data.is_open()) {
        cout << "File is open" << endl;
    }
    else cout << "File is not open" << endl;
    data.seekg(0, ios::end);
    int fileSize = data.tellg();
    int fileSize2 = data.tellg();
    data.close();
    while (fileSize == fileSize2) {
        data.open("1project.txt");
        data.seekg(0, ios::end);
        fileSize2 = data.tellg();
        data.close();
    }
    data.open("1project.txt");
    string result;
    while(!data.eof()) {
        if (!data.eof())
            getline(data,result);
    }
    cout << "\n" << "Output: " << result;
}